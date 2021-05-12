import {
  BadRequestException,
  HttpException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { League_OKException } from '../core/exceptions/league-ok.exception';
import { MemberRole } from '../core/enums/member-role.enum';
import { MemberStatus } from '../core/enums/member-status.enum';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { Team } from './entities/team.entity';
import { TeamMapper } from './mapper/team.map';
import { TeamRepository } from './repositories/team.repository';
import { UpdateTeamStatusDto } from './dto/update-team-status.dto';
import { MemberRepository } from '../member/repositories/member.repository';
import { Member } from '../member/entities/member.entity';
import { MatchRepository } from '../match/repositories/match.repository';
import { TeamStatsResponse } from './entities/team-response.entity';

@Injectable()
export class TeamService {
  // Max member allowed per team
  private readonly max_member_per_team;

  /**
   * Inject dependencies
   * @param teamRepository
   * @param memberRepository
   * @param matchRepository
   */
  constructor(
    @InjectRepository(TeamRepository)
    private teamRepository: TeamRepository,

    @InjectRepository(MemberRepository)
    private memberRepository: MemberRepository,

    @InjectRepository(MatchRepository)
    private matchRepository: MatchRepository,
  ) {}

  /**
   * Create a new team
   * @TODO
   * - Use 'cascade' to update members table with coach and captain IDs
   * @param createTeamDto
   */
  async createTeam(createTeamDto: CreateTeamDto) {
    return await this.teamRepository
      .find({ where: { name: createTeamDto.name.toLocaleLowerCase() } })
      .then(async (teamExists) => {
        if (teamExists.length)
          return new BadRequestException('Team name already exists');

        // Validate coach and captain roles
        const validateRoles: HttpException = await this.validateRoles(
          createTeamDto,
        );

        // Reject team creation process if roles are invalid
        if (validateRoles instanceof HttpException) {
          return validateRoles;
        } else {
          // Instantiate team with raw DTO
          const domain: Team = TeamMapper.toDomain(createTeamDto);

          // Creat the new team
          return await this.teamRepository
            .save(domain)
            .then(
              async (team) =>
                // Add coach to team
                await this.memberRepository
                  .createQueryBuilder()
                  .update(Member)
                  .set({ team_id: team.id })
                  .where('id = :id', { id: team.coach })
                  .execute()
                  .then(
                    async () =>
                      // Add captain to team
                      await this.memberRepository
                        .createQueryBuilder()
                        .update(Member)
                        .set({ team_id: team.id })
                        .where('id = :id', { id: team.captain })
                        .execute()
                        .then(
                          () =>
                            new League_OKException({
                              status: 'Team was successfully created',
                              team_id: team.id,
                            }),
                        )
                        .catch(
                          (error) =>
                            new InternalServerErrorException(error.message),
                        ),
                  )
                  .catch(
                    (error) => new InternalServerErrorException(error.message),
                  ),
              (team) =>
                new League_OKException({
                  status: 'Team was successfully created',
                  team_id: team.id,
                }),
            )
            .catch(
              async (error) =>
                new InternalServerErrorException(
                  error.code === '23503'
                    ? `No coach exists with id:${createTeamDto.coach} in the member table`
                    : error.message,
                ),
            );
        }
      });
  }

  /**
   * Find a given team
   * @param id
   * @returns
   */
  async findOneTeam(teamId: string) {
    return await this.teamRepository
      .findOneOrFail({ where: { id: teamId } })
      .catch((error) => new InternalServerErrorException(error.message));
  }

  /**
   * Find all the matches played by a given team
   * @param teamId
   * @returns
   */
  async findTeamMatches(teamId: string) {
    return await this.matchRepository
      .find({
        where: [{ home: teamId }, { away: teamId }],
      })
      .catch((error) => new InternalServerErrorException(error.message));
  }

  /**
   * Get the statistics of a given team
   * @param id
   * @returns
   */
  async findTeamStats(teamId: string) {
    const teamStats: TeamStatsResponse = {
      win: 0,
      loss: 0,
      players: 0,
      matches: 0,
    };

    // Matches count
    teamStats.matches = await this.matchRepository.count({
      where: [{ home: teamId }, { away: teamId }],
    });

    // Players count
    teamStats.players = await this.memberRepository.count({
      where: { team_id: teamId },
    });

    // Wins amnd losses count
    await this.matchRepository
      .find({
        where: [{ home: teamId }, { away: teamId }],
      })
      .then((result) => {
        return result.map((match) => {
          let wins = 0;
          let losses = 0;

          if (match.away === teamId)
            match.away_score > match.home_score ? ++wins : ++losses;

          if (match.home === teamId)
            match.home_score > match.away_score ? ++wins : ++losses;

          return {
            win: wins,
            loss: losses,
          };
        });
      })
      .then((winLossObj) => {
        for (const obj of winLossObj) {
          teamStats.win += obj.win;
          teamStats.loss += obj.loss;
        }
      })
      .catch((error) => new InternalServerErrorException(error.message));

    return teamStats;
  }

  /**
   * Retrieve the team members of a given team
   * @param id
   * @param role
   * @param status
   * @returns
   */
  async findTeamMembers(
    teamId: string,
    memberRole?: MemberRole,
    memberStatus?: MemberStatus,
  ) {
    // Build conditions for the optional query parameters
    const { role, status }: Record<string, string | boolean> = {
      role: memberRole !== undefined ? memberRole.length && memberRole : false,
      status:
        memberStatus !== undefined
          ? memberStatus.length && memberStatus
          : false,
    };

    // Extract payload based on the processed condition
    const queryPayload: Record<string, string> =
      role && status
        ? { ...{ team_id: teamId }, role, status }
        : role
        ? { ...{ team_id: teamId }, role }
        : status
        ? { ...{ team_id: teamId }, status }
        : { team_id: teamId };

    return this.teamRepository
      .findOneOrFail(teamId)
      .then(
        async () =>
          await this.memberRepository
            .find({
              where: queryPayload,
              relations: ['team'],
            })
            .then((result) => result)
            .catch((error) => new InternalServerErrorException(error.message)),
      )
      .catch(
        (error) =>
          new NotFoundException({
            message: 'Team does not exist',
            sql_error: error.message,
          }),
      );
  }

  /**
   * Update a given team
   *
   * @Todo
   *  - There is a max number of members per team
   * - captain or coach must belong to the subject team
   * @param teamId
   * @param updateTeamDto
   * @returns
   */
  async updateTeam(teamId: string, updateTeamDto: UpdateTeamDto) {
    return await this.teamRepository
      .findOneOrFail(teamId)
      .then(
        async (team) =>
          await this.teamRepository
            .createQueryBuilder()
            .update(Team)
            .set(
              TeamMapper.toUpdateDomain(teamId, {
                ...team,
                ...updateTeamDto,
              }),
            )
            .where('id = :id', { id: team.id })
            .execute()
            .then(() => new League_OKException('Team was successfully updated'))
            .catch((error) => new InternalServerErrorException(error.detail)),
      )
      .catch((error) => new InternalServerErrorException(error.message));
  }

  /**
   * Update the status of a given team
   * @param id
   * @param updateTeamDto
   * @returns
   */
  async updateTeamStatus(
    teamId: string,
    updateTeamStatusDto: UpdateTeamStatusDto,
  ) {
    return await this.teamRepository
      .findOneOrFail(teamId)
      .then(
        async (team) =>
          await this.teamRepository
            .createQueryBuilder()
            .update(Team)
            .set(
              TeamMapper.toUpdateDomain(team.id, {
                ...team,
                ...updateTeamStatusDto,
              }),
            )
            .where('id = :id', { id: team.id })
            .execute()
            .then(
              () => new League_OKException(`Status was successfully updated`),
            )
            .catch((error) => new InternalServerErrorException(error.message)),
      )
      .catch(
        (error) =>
          new NotFoundException({
            message: 'Team does not exist',
            sql_error: error,
          }),
      );
  }

  /**
   * Remove a given team from the database
   * @param teamId
   * @returns
   */
  async removeTeam(teamId: string) {
    return await this.teamRepository
      .findOneOrFail(teamId)
      .then(
        async (team) =>
          await this.teamRepository
            .delete(team.id)
            .then(() => new League_OKException('Team was successfully removed'))
            .catch((error) => new InternalServerErrorException(error.message)),
      )
      .catch(
        (error) =>
          new NotFoundException({
            message: 'Team does not exist',
            sql_error: error,
          }),
      );
  }

  /**
   * Check if the coach and captain of the new team actually have their roles as coach and/or captain
   * @param createTeamDto
   * @returns
   */
  async validateRoles(createTeamDto: CreateTeamDto) {
    return await this.memberRepository
      .findOneOrFail({ where: { id: createTeamDto.coach } })
      .then(async (member) => {
        if (member.role !== MemberRole.coach)
          return new BadRequestException(
            'This member is not a coach. Please assign a coach.',
          );

        if (Object.keys(createTeamDto).indexOf(MemberRole.captain) > -1)
          return await this.memberRepository
            .findOneOrFail({ where: { id: createTeamDto.captain } })
            .then(async (member) => {
              if (member.role !== MemberRole.captain)
                return new BadRequestException(
                  'This member is not a captain. Please assign a captain.',
                );
            })
            .catch(
              () =>
                new InternalServerErrorException(
                  'The id you provided for captain does not exist',
                ),
            );
      })
      .catch(
        () =>
          new InternalServerErrorException(
            'The id you provided for coach does not exist',
          ),
      );
  }
}

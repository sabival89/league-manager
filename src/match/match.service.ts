import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { League_OKException } from '../core/exceptions/league-ok.exception';
import { TeamRepository } from '../team/repositories/team.repository';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { Match } from './entities/match.entity';
import { MatchMapper } from './mappers/match.map';
import { MatchRepository } from './repositories/match.repository';

@Injectable()
export class MatchService {
  /**
   * Inject dependencies
   * @param matchRepository
   * @param teamRepository
   */
  constructor(
    @InjectRepository(MatchRepository) private matchRepository: MatchRepository,
    @InjectRepository(TeamRepository) private teamRepository: TeamRepository,
  ) {}

  /**
   * Create/Schedule a new match
   * @param createMatchDto
   */
  async createMatch(createMatchDto: CreateMatchDto) {
    return await this.teamRepository
      .findByIds([createMatchDto.home, createMatchDto.away])
      .then(async (team) => {
        // Check whether both teams exists
        if (team.length < 2)
          return new BadRequestException(
            `Away or home team Id does not exists`,
          );

        return await this.matchRepository
          .createQueryBuilder()
          .where('location = :location', { location: createMatchDto.location })
          .andWhere('played = :played', { played: createMatchDto.played })
          .getMany()
          .then(async (matchExists) => {
            // Discontinue the process if the match extsts or has been scheduled already
            if (matchExists.length)
              return new BadRequestException({
                error: `The match you are trying to schedule conflicts with an existing match `,
                match: matchExists,
              });

            return await this.matchRepository
              .save(MatchMapper.toDomain(createMatchDto))
              .then(
                (match) =>
                  new League_OKException({
                    message: 'Match was successfully scheduled',
                    match_id: match.id,
                  }),
              )
              .catch((error) => new InternalServerErrorException(error));
          })
          .catch((error) => new InternalServerErrorException(error));
      })
      .catch((error) => new InternalServerErrorException(error.detail));
  }

  /**
   * Finda given match
   * @param matchId
   * @returns
   */
  async findOneMatch(matchId: string) {
    return this.matchRepository
      .findOneOrFail(matchId)
      .catch((error) => new InternalServerErrorException(error.detail));
  }

  /**
   * Update a given match
   * @param matchId
   * @param updateMatchDto
   * @returns
   */
  async updateMatch(matchId: string, updateMatchDto: UpdateMatchDto) {
    return await this.matchRepository
      .findOneOrFail(matchId)
      .then(async (match) => {
        return await this.matchRepository
          .createQueryBuilder()
          .update(Match)
          .set(
            MatchMapper.toDomainUpdate(matchId, {
              ...match,
              ...updateMatchDto,
            }),
          )
          .where('id = :id', { id: matchId })
          .execute()
          .then(() => new League_OKException('Match was updated successfully'))
          .catch((error) => new InternalServerErrorException(error.message));
      })
      .catch(() => new NotFoundException('Match does not exist'));
  }

  /**
   * Remove a given scheduled match
   * @param matchId
   * @returns
   */
  async removeMatch(matchId: string) {
    return await this.matchRepository
      .findOneOrFail(matchId)
      .then(async () => {
        return await this.matchRepository
          .delete(matchId)
          .then(() => new League_OKException('Match was deleted successfully'))
          .catch((error) => new InternalServerErrorException(error));
      })
      .catch(() => new NotFoundException('Match does not exist'));
  }
}

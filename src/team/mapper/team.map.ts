import { CreateTeamDto } from '../dto/create-team.dto';
import { Team } from '../entities/team.entity';
import { v4 as uuidv4 } from 'uuid';
import { UpdateTeamDto } from '../dto/update-team.dto';
import { UpdateTeamStatusDto } from '../dto/update-team-status.dto';
import { TeamStatus } from 'src/core/enums/team-status.enum';

export class TeamMapper {
  /**
   * Instantiate new Team object for 'create' operations
   * @param raw
   * @returns
   */
  public static toDomain(raw: CreateTeamDto): Team {
    return new Team(
      uuidv4().toString(),
      raw.name,
      raw.coach,
      raw.captain,
      TeamStatus.inactive,
    );
  }

  /**
   * Instantiate new Team object for 'update' operations
   * @param teamId
   * @param raw
   * @returns
   */
  public static toUpdateDomain(
    teamId: string | null,
    raw: UpdateTeamDto & UpdateTeamStatusDto,
  ): Team {
    return new Team(teamId, raw.name, raw.coach, raw.captain, raw.status);
  }
}

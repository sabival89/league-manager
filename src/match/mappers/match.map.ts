import { CreateMatchDto } from '../dto/create-match.dto';
import { Match } from '../entities/match.entity';
import { v4 as uuidv4 } from 'uuid';
import { UpdateMatchDto } from '../dto/update-match.dto';

export class MatchMapper {
  /**
   * Instantiate new Match object for 'create' operations
   * @param raw
   * @returns
   */
  public static toDomain(raw: CreateMatchDto): Match {
    return new Match(
      uuidv4().toString(),
      raw.home,
      raw.away,
      raw.home_score,
      raw.away_score,
      raw.played,
      raw.location,
    );
  }

  /**
   * Instantiate new Match object for 'update' operations
   * @param matchId
   * @param raw
   * @returns
   */
  public static toDomainUpdate(matchId: string, raw: UpdateMatchDto): Match {
    return new Match(
      matchId,
      raw.home,
      raw.away,
      raw.home_score,
      raw.away_score,
      raw.played,
      raw.location,
    );
  }
}

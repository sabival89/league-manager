import { EntityRepository, Repository } from 'typeorm';
import { Match } from '../entities/match.entity';

@EntityRepository(Match)
export class MatchRepository extends Repository<Match> {}

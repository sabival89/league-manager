import { CreateMemberDto } from '../dto/create-member.dto';
import { Member } from '../entities/member.entity';
import { v4 as uuidv4 } from 'uuid';

export class MemberMapper {
  public static toDomain(raw: CreateMemberDto): Member {
    return new Member(
      uuidv4().toString(),
      raw.person_id,
      raw.role,
      raw.status,
      raw.balance,
      raw.team_id,
      raw.stats,
    );
  }
}

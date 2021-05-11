import { CreatePersonDto } from '../dto/create-person.dto';
import { v4 as uuidv4 } from 'uuid';
import { CreateMemberDto } from '../../member/dto/create-member.dto';
import { Member } from '../../member/entities/member.entity';
import { UpdateMemberDto } from '../../member/dto/update-member.dto';
import { UpdatePersonDto } from '../dto/update-person.dto';
import { UpdateMemberStatusDto } from 'src/member/dto/update-status-member.dto';
import { CreateMemberPaymentDto } from 'src/member/dto/create-payment.member.dto';
import { UpdateMemberTeamDto } from 'src/member/dto/update-team.dto';
import { UpdateMemberStatsDto } from 'src/member/dto/update-stats.dto';

export class PersonMapper {
  /**
   * Instantiate new Person object for 'create' operations
   * @param raw
   * @returns
   */
  public static toDomain(raw: CreatePersonDto & CreateMemberDto): Member {
    const member = new Member(
      uuidv4().toString(),
      raw.name,
      raw.last_name,
      raw.phone,
      raw.email,
      raw.dob,
      raw.role,
      raw.age,
    );
    return member;
  }

  /**
   * Instantiate new Person object for 'update' operations
   * @param memberId
   * @param raw
   * @returns
   */
  public static toDomainUpdate(
    memberId: string,
    raw: UpdateMemberDto &
      UpdatePersonDto &
      CreateMemberPaymentDto &
      UpdateMemberStatusDto &
      UpdateMemberTeamDto &
      UpdateMemberStatsDto,
  ): Member {
    return new Member(
      memberId,
      raw.name,
      raw.last_name,
      raw.phone,
      raw.email,
      raw.dob,
      raw.role,
      raw.age,
      raw.status,
      raw.balance,
      raw.team_id,
      raw.stats,
    );
  }
}

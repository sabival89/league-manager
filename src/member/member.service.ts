import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Person } from 'src/person/entities/person.entity';
import { League_OKException } from '../core/exceptions/league-ok.exception';
import { PersonRepository } from '../person/person.repository';
import {
  CreateMemberDto,
  CreateMemberPersonDto,
} from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { MemberRepository } from './entities/member.repository';
import { MemberPersonMapper } from './mappers/member-person.mapper';
import { MemberMapper } from './mappers/member.mapper';

@Injectable()
export class MemberService {
  /**
   * Inject dependencies
   * @param memberRepository
   * @param personRepository
   */
  constructor(
    @InjectRepository(MemberRepository)
    private memberRepository: MemberRepository,

    @InjectRepository(PersonRepository)
    private personRepository: PersonRepository,
  ) {}

  /**
   * Ceate payment
   * @param createMemberDto
   * @returns
   */
  createPayment(createMemberDto: CreateMemberDto) {
    return 'This action adds a new member';
  }

  /**
   * Create a new member
   * @param memberPersonDto
   * @returns
   */
  async createMember(memberPersonDto: CreateMemberPersonDto) {
    return await this.personRepository
      .save(MemberPersonMapper.toDomain(memberPersonDto))
      .then(async (response) => {
        const memberDto = {
          person_id: response.id,
          role: memberPersonDto.role,
        };

        return await this.memberRepository
          .save(MemberMapper.toDomain(memberDto))
          .then(() => new League_OKException('Member was successfully created'))
          .catch(async (error) => {
            await this.personRepository
              .remove(response)
              .then(() => new League_OKException('Rolled back inserts'));
            return new InternalServerErrorException(error.detail);
          });
      })
      .catch((error) => new InternalServerErrorException(error.detail));
  }

  async findOneMember(memberId: string) {
    const foundMember = await this.memberRepository
      .createQueryBuilder('member')
      .select(['*', 'member.id AS id'])
      .innerJoin(Person, 'person', 'member.person_id = person.id')
      .where('member.id = :memberId', { memberId })
      .getRawOne()
      .catch(console.error);
    console.log(foundMember);

    return `This action returns a #${memberId} member`;
  }

  findAllFreeAgents() {
    return `This action returns all member`;
  }

  updateMember(memberId: string, updateMemberDto: UpdateMemberDto) {
    return `This action updates a #${memberId} member`;
  }

  updateMemberStatus(memberId: string, updateMemberDto: UpdateMemberDto) {
    return `This action updates a #${memberId} member`;
  }

  removeMember(memberId: string) {
    return `This action removes a #${memberId} member`;
  }
}

import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MemberStatus } from '../core/enums/member-status.enum';
import { CreatePersonDto } from '../person/dto/create-person.dto';
import { PersonMapper } from '../person/mappers/person.map';
import { League_OKException } from '../core/exceptions/league-ok.exception';
import { PersonRepository } from '../person/repositories/person.repository';
import { CreateMemberDto } from './dto/create-member.dto';
import { CreateMemberPaymentDto } from './dto/create-payment.member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { UpdateMemberStatusDto } from './dto/update-status-member.dto';
import { Member } from './entities/member.entity';
import { MemberRepository } from './repositories/member.repository';

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
   * Create a new member
   * @TODO
   *  - Members need at least one form of contact email or phone
   * - All members have an initial fee upon creation, and their status is inactive
   * @param memberPersonDto
   * @returns
   */
  async createMember(createMemberDto: CreatePersonDto & CreateMemberDto) {
    return await this.memberRepository
      .save(PersonMapper.toDomain(createMemberDto))
      .then(
        async (member) =>
          new League_OKException({
            status: 'Member was successfully created',
            member_id: member.id,
          }),
      )
      .catch(async (error) => new InternalServerErrorException(error.detail));
  }

  /**
   * Create mmebership payment
   * @param memberId
   * @param memberPaymentDto
   * @returns
   */
  async createPayment(
    memberId: string,
    memberPaymentDto: CreateMemberPaymentDto,
  ) {
    return await this.memberRepository
      .findOneOrFail({ where: { id: memberId } })
      .then(async (member) => {
        const updateMemberStatus: MemberStatus =
          memberPaymentDto.balance > 0
            ? MemberStatus.inactive
            : MemberStatus.active;

        return await this.memberRepository
          .createQueryBuilder()
          .update(Member)
          .set(
            PersonMapper.toDomainUpdate(member.id, {
              ...member,
              ...{
                status: updateMemberStatus,
                balance: memberPaymentDto.balance,
              },
            }),
          )
          .where('id = :id', { id: memberId })
          .execute()
          .then(() => new League_OKException('Payment was successful'))
          .catch((error) => new InternalServerErrorException(error));
      })
      .catch(
        (error) =>
          new InternalServerErrorException({
            message: 'Member not found',
            description: error,
          }),
      );
  }

  /**
   * Find only one member
   * @TODO
   * - Write return messages for found and not found cases
   * @param memberId
   * @returns
   */
  async findOneMember(memberId: string) {
    return await this.memberRepository
      .findOneOrFail({
        where: { id: memberId },
      })
      .then((member) => member)
      .catch(
        (error) =>
          new InternalServerErrorException({
            message: 'Member not found',
            description: error,
          }),
      );
  }

  /**
   * Find all members without a team
   * @TODO
   * @returns
   */
  async findAllFreeAgents() {
    return await this.memberRepository
      .find({ where: { team_id: null } })
      .catch((error) => new InternalServerErrorException(error.message));
  }

  /**
   * Find all members
   * @returns
   */
  async findAllMembers() {
    return await this.memberRepository
      .find()
      .catch((error) => new InternalServerErrorException(error.message));
  }

  /**
   * Update the profile of a given member
   * @TODO
   * - Once a members balance is 0, the member should be marked as active If they were inactive
   * @param memberId
   * @param updateMemberDto
   * @returns
   */
  async updateMember(memberId: string, updateMemberDto: UpdateMemberDto) {
    return await this.memberRepository
      .findOneOrFail(memberId)
      .then(async (member) => {
        return await this.memberRepository
          .createQueryBuilder()
          .update(Member)
          .set(
            PersonMapper.toDomainUpdate(memberId, {
              ...member,
              ...updateMemberDto,
            }),
          )
          .where('id = :id', { id: memberId })
          .execute()
          .then(() => new League_OKException('update was successfully'))
          .catch((error) => new InternalServerErrorException(error.message));
      })
      .catch(() => new NotFoundException('Member does not exist'));
  }

  /**
   * Update  a given member's status
   * @TODO
   * - Cannot update status and not modify balance
   * - Before changing memeber's status to active, make sure balance is zero
   * @param memberId
   * @param updateMemberStatusDto
   * @returns
   */
  async updateMemberStatus(
    memberId: string,
    updateMemberStatusDto: UpdateMemberStatusDto,
  ) {
    return await this.memberRepository
      .findOneOrFail(memberId)
      .then(async (member) => {
        return await this.memberRepository
          .createQueryBuilder()
          .update(Member)
          .set(
            PersonMapper.toDomainUpdate(memberId, {
              ...member,
              ...updateMemberStatusDto,
            }),
          )
          .where('id = :id', { id: memberId })
          .execute()
          .then(() => new League_OKException('Status was updated successfully'))
          .catch((error) => new InternalServerErrorException(error.message));
      })
      .catch(() => new NotFoundException('Member does not exist'));
  }

  /**
   * Delete a given member
   * @param memberId
   * @returns
   */
  async removeMember(memberId: string) {
    return await this.memberRepository
      .findOneOrFail(memberId)
      .then(async () => {
        return await this.memberRepository
          .delete(memberId)
          .then(() => new League_OKException('member was deleted successfully'))
          .catch((error) => new InternalServerErrorException(error));
      })
      .catch(() => new NotFoundException('Member does not exist'));
  }
}

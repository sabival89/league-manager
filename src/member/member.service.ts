import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MemberStatusEnum } from '../core/enums/member-status.enum';
import { CreatePersonDto } from '../person/dto/create-person.dto';
import { PersonMapper } from '../person/mappers/person.map';
import { League_OKException } from '../core/exceptions/league-ok.exception';
import { CreateMemberDto } from './dto/create-member.dto';
import { CreateMemberPaymentDto } from './dto/create-payment.member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { UpdateMemberStatusDto } from './dto/update-status-member.dto';
import { MemberRepository } from './repositories/member.repository';
import calculateAge from 'src/core/utilities/calculate-age';

@Injectable()
export class MemberService {
  /**
   * Maximum age value
   */
  private readonly MIN_AGE = 18;

  /**
   * Maximum number of members per team
   */
  private readonly MAX_MEMBER_PER_TEAM = 11;
  /**
   * Inject dependencies
   * @param memberRepository
   * @param personRepository
   */
  constructor(
    @InjectRepository(MemberRepository)
    private memberRepository: MemberRepository,
  ) {}

  /**
   * Create a new member
   * @param memberPersonDto
   * @returns
   */
  async createMember(createMemberDto: CreatePersonDto & CreateMemberDto) {
    if (calculateAge(createMemberDto.dob) < this.MIN_AGE)
      return new BadRequestException(`Age must be ${this.MIN_AGE} and above.`);

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
        const updateMemberStatus: MemberStatusEnum =
          memberPaymentDto.balance > 0
            ? MemberStatusEnum.inactive
            : MemberStatusEnum.active;

        return await this.memberRepository
          .save(
            PersonMapper.toDomainUpdate(member.id, {
              ...member,
              ...{
                status: updateMemberStatus,
                balance: memberPaymentDto.balance,
              },
            }),
          )
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
   * @TODO - MAX TEAM MEMBER
   * @param memberId
   * @param updateMemberDto
   * @returns
   */
  async updateMember(memberId: string, updateMemberDto: UpdateMemberDto) {
    return await this.memberRepository
      .findOneOrFail(memberId)
      .then(async (member) => {
        if (Object.keys(updateMemberDto).indexOf('team_id') > -1) {
          // Get the ount of all members of the subject team and
          // ensure it doesn't exceed the max memeber per team amount
          const teamMembers: number = await this.memberRepository.count({
            where: { team_id: updateMemberDto.team_id },
          });

          if (teamMembers >= this.MAX_MEMBER_PER_TEAM) {
            return new BadRequestException(
              "You've reached the maximum number of member for this team",
            );
          }
        }

        return await this.memberRepository
          .save(
            PersonMapper.toDomainUpdate(memberId, {
              ...member,
              ...updateMemberDto,
            }),
          )
          .then(() => new League_OKException('Update was successfully'))
          .catch((error) => new InternalServerErrorException(error.message));
      })
      .catch(() => new NotFoundException('Member does not exist'));
  }

  /**
   * Update a given member's status
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
        // Cannot update status to active if member has an outstanding balance
        if (
          member.balance > 0 &&
          updateMemberStatusDto.status === MemberStatusEnum.active
        )
          return new BadRequestException(
            'Sorry, member has an outstanding balance.',
          );
        return await this.memberRepository
          .save(
            PersonMapper.toDomainUpdate(memberId, {
              ...member,
              ...updateMemberStatusDto,
            }),
          )
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
      .then(async (member) => {
        return await this.memberRepository
          .remove(member)
          .then(() => new League_OKException('Member was deleted successfully'))
          .catch((error) => new InternalServerErrorException(error.message));
      })
      .catch(() => new NotFoundException('Member does not exist'));
  }
}

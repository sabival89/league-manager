import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { MemberService } from './member.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { ApiTags } from '@nestjs/swagger';
import { UpdateMemberStatusDto } from './dto/update-status-member.dto';
import { CreateMemberPaymentDto } from './dto/create-payment.member.dto';
import { ValidationPipe } from './pipes/league-validation.pipe';

@ApiTags('Member')
@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  /**
   * Handler for retieving all members
   * @returns
   */
  @Get()
  async findAllMembers() {
    return this.memberService.findAllMembers();
  }

  /**
   * Handler for retrieving members without a team
   * @returns
   */

  @Get('free-agents')
  async findAllFreeAgents() {
    return this.memberService.findAllFreeAgents();
  }

  /**
   * Handler for retrieving only one member
   * @param memberId
   * @returns
   */
  @Get(':id')
  async findOneMember(@Param('id', ParseUUIDPipe) memberId: string) {
    return this.memberService.findOneMember(memberId);
  }

  /**
   * Handler for creating a new member
   * @param createMemberDto
   * @returns
   */
  @Post()
  async createMember(
    @Body(new ValidationPipe()) createMemberDto: CreateMemberDto,
  ) {
    return this.memberService.createMember(createMemberDto);
  }

  /**
   * Handler for membership payment
   * @param memberId
   * @param createMemberPaymentDto
   * @returns
   */
  @Post(':id/payment')
  async createPayment(
    @Param('id', ParseUUIDPipe) memberId: string,
    @Body(new ValidationPipe()) createMemberPaymentDto: CreateMemberPaymentDto,
  ) {
    return this.memberService.createPayment(memberId, createMemberPaymentDto);
  }

  /**
   * Handler for updating memeber information
   * @param memberId
   * @param updateMemberDto
   * @returns
   */
  @Patch(':id')
  async updateMember(
    @Param('id', ParseUUIDPipe) memberId: string,
    @Body(new ValidationPipe()) updateMemberDto: UpdateMemberDto,
  ) {
    return this.memberService.updateMember(memberId, updateMemberDto);
  }

  /**Handler for updating a given member's status
   *
   * @param memberId
   * @param updateMemberStatusDto
   * @returns
   */
  @Patch(':id/status')
  async updateMemberStatus(
    @Param('id', ParseUUIDPipe) memberId: string,
    @Body(new ValidationPipe()) updateMemberStatusDto: UpdateMemberStatusDto,
  ) {
    return this.memberService.updateMemberStatus(
      memberId,
      updateMemberStatusDto,
    );
  }

  /**
   * Handler for deleting a member
   * @param memberId
   * @returns
   */
  @Delete(':id')
  async removeMember(@Param('id', ParseUUIDPipe) memberId: string) {
    return this.memberService.removeMember(memberId);
  }
}

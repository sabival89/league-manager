import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
  ParseUUIDPipe,
} from '@nestjs/common';
import { MemberService } from './member.service';
import { CreateMemberDto } from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { ApiTags } from '@nestjs/swagger';
import { UpdateMemberStatusDto } from './dto/update-status-member.dto';
import { CreateMemberPaymentDto } from './dto/create-payment.member.dto';

@ApiTags('Member')
@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Post()
  async createMember(
    @Body(new ValidationPipe()) createMemberDto: CreateMemberDto,
  ) {
    return this.memberService.createMember(createMemberDto);
  }

  @Post(':id/payment')
  async createPayment(
    @Param('id', ParseUUIDPipe) memberId: string,
    @Body(new ValidationPipe()) createMemberPaymentDto: CreateMemberPaymentDto,
  ) {
    return this.memberService.createPayment(memberId, createMemberPaymentDto);
  }

  @Get(':id')
  async findOneMember(@Param('id', ParseUUIDPipe) memberId: string) {
    return this.memberService.findOneMember(memberId);
  }

  @Get()
  async findAllMembers() {
    return this.memberService.findAllMembers();
  }

  @Get('free-agents')
  async findAllFreeAgents() {
    return this.memberService.findAllFreeAgents();
  }

  @Patch(':id')
  async updateMember(
    @Param('id', ParseUUIDPipe) memberId: string,
    @Body(new ValidationPipe()) updateMemberDto: UpdateMemberDto,
  ) {
    return this.memberService.updateMember(memberId, updateMemberDto);
  }

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

  @Delete(':id')
  async removeMember(@Param('id', ParseUUIDPipe) memberId: string) {
    return this.memberService.removeMember(memberId);
  }
}

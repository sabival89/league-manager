import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ValidationPipe,
} from '@nestjs/common';
import { MemberService } from './member.service';
import {
  CreateMemberDto,
  CreateMemberPersonDto,
} from './dto/create-member.dto';
import { UpdateMemberDto } from './dto/update-member.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Member')
@Controller('member')
export class MemberController {
  constructor(private readonly memberService: MemberService) {}

  @Post()
  createMember(
    @Body(new ValidationPipe()) createMemberToPersonDto: CreateMemberPersonDto,
  ) {
    return this.memberService.createMember(createMemberToPersonDto);
  }

  @Post(':id/payment')
  createPayment(@Body() createMemberDto: CreateMemberDto) {
    return this.memberService.createPayment(createMemberDto);
  }

  @Get(':id')
  findOneMember(@Param('id') memberId: string) {
    return this.memberService.findOneMember(memberId);
  }

  @Get('/free-agent')
  findAllFreeAgents() {
    return this.memberService.findAllFreeAgents();
  }

  @Patch(':id')
  updateMember(
    @Param('id') memberId: string,
    @Body() updateMemberDto: UpdateMemberDto,
  ) {
    return this.memberService.updateMember(memberId, updateMemberDto);
  }

  @Patch(':id/status')
  updateMemberStatus(
    @Param('id') memberId: string,
    @Body() updateMemberDto: UpdateMemberDto,
  ) {
    return this.memberService.updateMemberStatus(memberId, updateMemberDto);
  }

  @Delete(':id')
  removeMember(@Param('id') memberId: string) {
    return this.memberService.removeMember(memberId);
  }
}

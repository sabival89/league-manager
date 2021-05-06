import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { TeamService } from './team.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { MemberRole } from '../core/enums/member-role.enum';
import { MemberStatus } from '../core/enums/member-status.enum';
import { TeamStats } from './entities/team-stats.entity';

@ApiTags('Team')
@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  @Post()
  createTeam(@Body() createTeamDto: CreateTeamDto) {
    return this.teamService.createTeam(createTeamDto);
  }

  @Get(':id')
  findOneTeam(@Param('id') id: string) {
    return this.teamService.findOneTeam(+id);
  }

  @Get(':id/matches')
  findTeamMatches(@Param('id') id: string) {
    return this.teamService.findTeamMatches(+id);
  }
  @ApiQuery({ name: 'gender', required: false })
  @ApiQuery({ name: 'role', enum: MemberRole, required: false })
  @ApiQuery({ name: 'status', enum: MemberStatus, required: false })
  @Get(':id/member')
  findTeamMembers(
    @Param('id') id: string,
    @Query('role') role: MemberRole = MemberRole.coach,
    @Query('status') status: MemberStatus = MemberStatus.active,
  ) {
    return this.teamService.findTeamMembers(id, role, status);
  }

  @ApiOkResponse({ type: TeamStats })
  @Get(':id/stats')
  findTeamStats(@Param('id') id: string) {
    return this.teamService.findTeamStats(+id);
  }

  @Patch(':id')
  updateTeam(@Param('id') id: string, @Body() updateTeamDto: UpdateTeamDto) {
    return this.teamService.updateTeam(+id, updateTeamDto);
  }

  updateTeamStatus(
    @Param('id') id: string,
    @Body() updateTeamDto: UpdateTeamDto,
  ) {
    return this.teamService.updateTeamStatus(+id, updateTeamDto);
  }

  @Delete(':id')
  removeTeam(@Param('id') id: string) {
    return this.teamService.removeTeam(+id);
  }
}

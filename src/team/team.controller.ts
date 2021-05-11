import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  ParseUUIDPipe,
  ValidationPipe,
} from '@nestjs/common';
import { TeamService } from './team.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { MemberRole } from '../core/enums/member-role.enum';
import { MemberStatus } from '../core/enums/member-status.enum';
import { UpdateTeamStatusDto } from './dto/update-team-status.dto';
import { TeamStatsResponse } from './entities/team-response.entity';

@ApiTags('Team')
@Controller('team')
export class TeamController {
  constructor(private readonly teamService: TeamService) {}

  /**
   *
   * @param createTeamDto Handler for creating a new team
   * @returns
   */
  @Post()
  createTeam(@Body(new ValidationPipe()) createTeamDto: CreateTeamDto) {
    return this.teamService.createTeam(createTeamDto);
  }

  /**
   * Handler for retrieving a single team
   * @param teamId
   * @returns
   */
  @Get(':id')
  findOneTeam(@Param('id', ParseUUIDPipe) teamId: string) {
    return this.teamService.findOneTeam(teamId);
  }

  /**
   * Handler for retrieving all matches played by a given team
   * @param teamId
   * @returns
   */
  @Get(':id/matches')
  findTeamMatches(@Param('id', ParseUUIDPipe) teamId: string) {
    return this.teamService.findTeamMatches(teamId);
  }

  /**
   * Handler for retrieving all members of a given team
   * @param teamId
   * @param role
   * @param status
   * @returns
   */

  @ApiQuery({ name: 'role', enum: MemberRole, required: false })
  @ApiQuery({ name: 'status', enum: MemberStatus, required: false })
  @Get(':id/member')
  findTeamMembers(
    @Param('id', ParseUUIDPipe) teamId: string,
    @Query('role') role: MemberRole,
    @Query('status') status: MemberStatus,
  ) {
    return this.teamService.findTeamMembers(teamId, role, status);
  }

  /**
   * Handler for retrieving team statistics
   * @param teamId
   * @returns
   */
  @ApiOkResponse({ type: TeamStatsResponse })
  @Get(':id/stats')
  findTeamStats(
    @Param('id', ParseUUIDPipe) teamId: string,
  ): Promise<TeamStatsResponse> {
    return this.teamService.findTeamStats(teamId);
  }

  /**
   * Handler for updating a given team
   * @param teamId
   * @param updateTeamDto
   * @returns
   */
  @Patch(':id')
  updateTeam(
    @Param('id', ParseUUIDPipe) teamId: string,
    @Body(new ValidationPipe()) updateTeamDto: UpdateTeamDto,
  ) {
    return this.teamService.updateTeam(teamId, updateTeamDto);
  }

  /**
   * Handler for updating a given team's status
   * @param teamId
   * @param updateTeamDto
   * @returns
   */
  @Patch(':id/status')
  updateTeamStatus(
    @Param('id', ParseUUIDPipe) teamId: string,
    @Body(new ValidationPipe()) updateTeamDto: UpdateTeamStatusDto,
  ) {
    return this.teamService.updateTeamStatus(teamId, updateTeamDto);
  }

  /**
   * Handler for deleting a given team
   * @param teamId
   * @returns
   */
  @Delete(':id')
  removeTeam(@Param('id', ParseUUIDPipe) teamId: string) {
    return this.teamService.removeTeam(teamId);
  }
}

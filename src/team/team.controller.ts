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
  HttpException,
} from '@nestjs/common';
import { TeamService } from './team.service';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';
import { ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { MemberRoleEnum } from '../core/enums/member-role.enum';
import { MemberStatusEnum } from '../core/enums/member-status.enum';
import { UpdateTeamStatusDto } from './dto/update-team-status.dto';
import { TeamStatsResponse } from './entities/team-response.entity';
import { Team } from './entities/team.entity';
import { Member } from 'src/member/entities/member.entity';
import { Match } from 'src/match/entities/match.entity';

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
  async createTeam(@Body(new ValidationPipe()) createTeamDto: CreateTeamDto): Promise<HttpException> {
    return await this.teamService.createTeam(createTeamDto);
  }

  /**
   * Handler for retrieving a single team
   * @param teamId
   * @returns
   */
  @Get(':id')
  async findOneTeam(@Param('id', ParseUUIDPipe) teamId: string): Promise<HttpException | Team> {
    return this.teamService.findOneTeam(teamId);
  }

  /**
   * Handler for retrieving all matches played by a given team
   * @param teamId
   * @returns
   */
  @Get(':id/matches')
  async findTeamMatches(@Param('id', ParseUUIDPipe) teamId: string): Promise<Array<Match> | HttpException> {
    return await this.teamService.findTeamMatches(teamId);
  }

  /**
   * Handler for retrieving all members of a given team
   * @param teamId
   * @param role
   * @param status
   * @returns
   */

  @ApiQuery({ name: 'role', enum: MemberRoleEnum, required: false })
  @ApiQuery({ name: 'status', enum: MemberStatusEnum, required: false })
  @Get(':id/member')
  async findTeamMembers(
    @Param('id', ParseUUIDPipe) teamId: string,
    @Query('role') role: MemberRoleEnum,
    @Query('status') status: MemberStatusEnum,
  ): Promise<HttpException | Array<Member>> {
    return await this.teamService.findTeamMembers(teamId, role, status);
  }

  /**
   * Handler for retrieving team statistics
   * @param teamId
   * @returns
   */
  @ApiOkResponse({ type: TeamStatsResponse })
  @Get(':id/stats')
  async findTeamStats(
    @Param('id', ParseUUIDPipe) teamId: string,
  ): Promise<TeamStatsResponse> {
    return await this.teamService.findTeamStats(teamId);
  }

  /**
   * Handler for updating a given team
   * @param teamId
   * @param updateTeamDto
   * @returns
   */
  @Patch(':id')
  async updateTeam(
    @Param('id', ParseUUIDPipe) teamId: string,
    @Body(new ValidationPipe()) updateTeamDto: UpdateTeamDto,
  ): Promise<HttpException> {
    return await this.teamService.updateTeam(teamId, updateTeamDto);
  }

  /**
   * Handler for updating a given team's status
   * @param teamId
   * @param updateTeamDto
   * @returns
   */
  @Patch(':id/status')
  async updateTeamStatus(
    @Param('id', ParseUUIDPipe) teamId: string,
    @Body(new ValidationPipe()) updateTeamDto: UpdateTeamStatusDto,
  ): Promise<HttpException> {
    return await this.teamService.updateTeamStatus(teamId, updateTeamDto);
  }

  /**
   * Handler for deleting a given team
   * @param teamId
   * @returns
   */
  @Delete(':id')
  async removeTeam(@Param('id', ParseUUIDPipe) teamId: string): Promise<HttpException> {
    return await this.teamService.removeTeam(teamId);
  }
}

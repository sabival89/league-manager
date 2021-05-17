import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpException,
} from '@nestjs/common';
import { MatchService } from './match.service';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { ApiTags } from '@nestjs/swagger';
import { ValidationPipe } from '../member/pipes/league-validation.pipe';
import { Match } from './entities/match.entity';

@ApiTags('Match')
@Controller('match')
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  /**
   * Handler for match scheduling
   * @param createMatchDto
   * @returns
   */
  @Post()
  async createMatch(@Body(new ValidationPipe()) createMatchDto: CreateMatchDto):Promise<HttpException> {
    return await this.matchService.createMatch(createMatchDto);
  }

  /**
   * Handler for retrieving a given match
   * @param matchId
   * @returns
   */
  @Get(':id')
  async findOneMatch(@Param('id', ParseUUIDPipe) matchId: string):Promise<HttpException | Match>  {
    return await this.matchService.findOneMatch(matchId);
  }

  /**
   * Handler for updating a given match
   * @param matchId
   * @param updateMatchDto
   * @returns
   */
  @Patch(':id')
  async updateMatch(
    @Param('id', ParseUUIDPipe) matchId: string,
    @Body(new ValidationPipe()) updateMatchDto: UpdateMatchDto,
  ):Promise<HttpException> {
    return await this.matchService.updateMatch(matchId, updateMatchDto);
  }

  /**
   * Handler for deleting a given match
   * @param matchId
   * @returns
   */
  @Delete(':id')
  async removeMatch(@Param('id', ParseUUIDPipe) matchId: string):Promise<HttpException> {
    return await this.matchService.removeMatch(matchId);
  }
}

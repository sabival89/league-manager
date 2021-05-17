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
import { MatchService } from './match.service';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { ApiTags } from '@nestjs/swagger';
import { ValidationPipe } from '../member/pipes/league-validation.pipe';

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
  createMatch(@Body(new ValidationPipe()) createMatchDto: CreateMatchDto) {
    return this.matchService.createMatch(createMatchDto);
  }

  /**
   * Handler for retrieving a given match
   * @param matchId
   * @returns
   */
  @Get(':id')
  findOneMatch(@Param('id', ParseUUIDPipe) matchId: string) {
    return this.matchService.findOneMatch(matchId);
  }

  /**
   * Handler for updating a given match
   * @param matchId
   * @param updateMatchDto
   * @returns
   */
  @Patch(':id')
  updateMatch(
    @Param('id', ParseUUIDPipe) matchId: string,
    @Body(new ValidationPipe()) updateMatchDto: UpdateMatchDto,
  ) {
    return this.matchService.updateMatch(matchId, updateMatchDto);
  }

  /**
   * Handler for deleting a given match
   * @param matchId
   * @returns
   */
  @Delete(':id')
  removeMatch(@Param('id', ParseUUIDPipe) matchId: string) {
    return this.matchService.removeMatch(matchId);
  }
}

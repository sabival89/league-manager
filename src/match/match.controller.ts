import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { MatchService } from './match.service';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Match')
@Controller('match')
export class MatchController {
  constructor(private readonly matchService: MatchService) {}

  @Post()
  createMatch(@Body() createMatchDto: CreateMatchDto) {
    return this.matchService.createMatch(createMatchDto);
  }

  @Get(':id')
  findOneMatch(@Param('id') id: string) {
    return this.matchService.findOneMatch(+id);
  }

  @Patch(':id')
  updateMatch(@Param('id') id: string, @Body() updateMatchDto: UpdateMatchDto) {
    return this.matchService.updateMatch(+id, updateMatchDto);
  }

  @Delete(':id')
  removeMatch(@Param('id') id: string) {
    return this.matchService.removeMatch(+id);
  }
}

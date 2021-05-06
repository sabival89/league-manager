import { Injectable } from '@nestjs/common';
import { CreateMatchDto } from './dto/create-match.dto';
import { UpdateMatchDto } from './dto/update-match.dto';

@Injectable()
export class MatchService {
  createMatch(createMatchDto: CreateMatchDto) {
    return 'This action adds a new match';
  }

  findOneMatch(id: number) {
    return `This action returns a #${id} match`;
  }

  updateMatch(id: number, updateMatchDto: UpdateMatchDto) {
    return `This action updates a #${id} match`;
  }

  removeMatch(id: number) {
    return `This action removes a #${id} match`;
  }
}

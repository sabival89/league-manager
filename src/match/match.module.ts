import { Module } from '@nestjs/common';
import { MatchService } from './match.service';
import { MatchController } from './match.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatchRepository } from './repositories/match.repository';
import { TeamRepository } from 'src/team/repositories/team.repository';

@Module({
  imports: [TypeOrmModule.forFeature([MatchRepository, TeamRepository])],
  controllers: [MatchController],
  providers: [MatchService],
})
export class MatchModule {}

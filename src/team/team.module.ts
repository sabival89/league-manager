import { Module } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamRepository } from './repositories/team.repository';
import { MemberRepository } from 'src/member/repositories/member.repository';
import { MatchRepository } from 'src/match/repositories/match.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TeamRepository,
      MemberRepository,
      MatchRepository,
    ]),
  ],
  controllers: [TeamController],
  providers: [TeamService],
})
export class TeamModule {}

import { Module } from '@nestjs/common';
import { TeamService } from './team.service';
import { TeamController } from './team.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TeamRepository } from './repositories/team.repository';
import { MemberRepository } from '../member/repositories/member.repository';
import { MatchRepository } from 'src/match/repositories/match.repository';
import { TeamSubscriber } from './subscribers/team.subscriber';
import { AuditRepository } from 'src/audit/repositories/audit.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      TeamRepository,
      MemberRepository,
      MatchRepository,
      AuditRepository,
    ]),
  ],
  controllers: [TeamController],
  providers: [TeamService, TeamSubscriber],
})
export class TeamModule {}

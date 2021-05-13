import { Module } from '@nestjs/common';
import { MatchService } from './match.service';
import { MatchController } from './match.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MatchRepository } from './repositories/match.repository';
import { TeamRepository } from 'src/team/repositories/team.repository';
import { AuditRepository } from 'src/audit/repositories/audit.repository';
import { MatchSubscriber } from './subscribers/match.subscriber';
import { MemberRepository } from 'src/member/repositories/member.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      AuditRepository,
      MatchRepository,
      TeamRepository,
    ]),
  ],
  controllers: [MatchController],
  providers: [MatchService, MatchSubscriber],
})
export class MatchModule {}

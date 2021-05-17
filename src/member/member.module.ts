import { Module } from '@nestjs/common';
import { MemberService } from './member.service';
import { MemberController } from './member.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberRepository } from './repositories/member.repository';
import { PersonRepository } from '../person/repositories/person.repository';
import { MemberSubscriber } from './subscribers/member.subscribers';
import { AuditRepository } from 'src/audit/repositories/audit.repository';
import { TeamModule } from 'src/team/team.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      MemberRepository,
      PersonRepository,
      AuditRepository,
    ]),
  ],
  controllers: [MemberController],
  providers: [MemberService, MemberSubscriber, TeamModule],
})
export class MemberModule {}

import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { MemberModule } from './member/member.module';
import { TeamModule } from './team/team.module';
import { PersonModule } from './person/person.module';
import { MatchModule } from './match/match.module';
import { StaffModule } from './staff/staff.module';
import { AuditModule } from './audit/audit.module';

@Module({
  imports: [
    DatabaseModule,
    MemberModule,
    TeamModule,
    PersonModule,
    MatchModule,
    StaffModule,
    AuditModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { StaffService } from './staff.service';
import { StaffController } from './staff.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StaffRepository } from './repository/staff.repository';
import { PersonRepository } from 'src/person/repositories/person.repository';
import { AuditRepository } from 'src/audit/repositories/audit.repository';
import { StaffSubscriber } from './subscriber/staff.subscriber';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      StaffRepository,
      PersonRepository,
      AuditRepository,
    ]),
  ],
  controllers: [StaffController],
  providers: [StaffService, StaffSubscriber],
})
export class StaffModule {}

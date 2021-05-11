import { Module } from '@nestjs/common';
import { MemberService } from './member.service';
import { MemberController } from './member.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MemberRepository } from './repositories/member.repository';
import { PersonRepository } from '../person/repositories/person.repository';

@Module({
  imports: [TypeOrmModule.forFeature([MemberRepository, PersonRepository])],
  controllers: [MemberController],
  providers: [MemberService],
})
export class MemberModule {}

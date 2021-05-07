import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMemberDto } from 'src/member/dto/create-member.dto';
import { CreatePersonDto } from './dto/create-person.dto';
import { PersonMapper } from './mappers/person.map';
import { PersonRepository } from './person.repository';

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(PersonRepository)
    private personRepository: PersonRepository,
  ) {}

  createPerson(createPersonDto: CreatePersonDto & CreateMemberDto) {
    // const domain = PersonMapper.toDomain(createPersonDto);
    // return this.personRepository.save(domain);
  }
  findOnePerson(id: number) {
    return `This action returns a #${id} person`;
  }
}

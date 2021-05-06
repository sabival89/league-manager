import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreatePersonDto } from './dto/create-person.dto';
import { PersonMapper } from './mappers/person.mapper';
import { PersonRepository } from './person.repository';

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(PersonRepository)
    private personRepository: PersonRepository,
  ) {}

  createPerson(createPersonDto: CreatePersonDto) {
    const domain = PersonMapper.toDomain(createPersonDto);
    return this.personRepository.save(domain);
  }
  findOnePerson(id: number) {
    return `This action returns a #${id} person`;
  }
}

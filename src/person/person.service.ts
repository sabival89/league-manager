import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PersonRepository } from './repositories/person.repository';

@Injectable()
export class PersonService {
  /**
   * Inject dependencies
   * @param personRepository
   */
  constructor(
    @InjectRepository(PersonRepository)
    private personRepository: PersonRepository,
  ) {}

  /**
   * Find a give person
   * @param personId
   * @returns
   */
  async findOnePerson(personId: string) {
    return await this.personRepository
      .findOneOrFail(personId)
      .catch((error) => new InternalServerErrorException(error.message));
  }
}

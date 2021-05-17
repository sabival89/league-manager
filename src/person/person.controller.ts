import { Controller, Get, HttpException, Param, ParseUUIDPipe } from '@nestjs/common';
import { PersonService } from './person.service';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { Person } from './entities/person.entity';

@ApiTags('Person')
@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  /**
   * Handler for retrieving a given person
   * @param personId
   * @returns
   */
  @ApiProperty()
  @Get(':id')
  async findOnePerson(@Param('id', ParseUUIDPipe) personId: string):Promise<HttpException | Person> {
    return await this.personService.findOnePerson(personId);
  }
}

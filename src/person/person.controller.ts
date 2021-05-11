import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { PersonService } from './person.service';
import { ApiProperty, ApiTags } from '@nestjs/swagger';

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
  findOnePerson(@Param('id', ParseUUIDPipe) personId: string) {
    return this.personService.findOnePerson(personId);
  }
}

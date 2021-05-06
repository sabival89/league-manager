import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PersonService } from './person.service';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { CreatePersonDto } from './dto/create-person.dto';

@ApiTags('Person')
@Controller('person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @ApiProperty()
  @Post()
  createPerson(@Body() createPersonDto: CreatePersonDto) {
    return this.personService.createPerson(createPersonDto);
  }

  @ApiProperty()
  @Get(':id')
  findOnePerson(@Param('id') id: string) {
    return this.personService.findOnePerson(+id);
  }
}

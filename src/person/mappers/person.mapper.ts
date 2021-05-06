import { CreatePersonDto } from '../dto/create-person.dto';
import { Person } from '../entities/person.entity';
import { v4 as uuidv4 } from 'uuid';

export class PersonMapper {
  public static toDomain(raw: CreatePersonDto): Person {
    return new Person(
      uuidv4().toString(),
      raw.name,
      raw.last_name,
      raw.phone,
      raw.email,
      raw.dob,
    );
  }
}

import { CreateMemberPersonDto } from '../dto/create-member.dto';
import { v4 as uuidv4 } from 'uuid';
import { Person } from 'src/person/entities/person.entity';

export class MemberPersonMapper {
  public static toDomain(raw: CreateMemberPersonDto): Person {
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

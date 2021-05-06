import { IsUUID } from 'class-validator';
import { Column, Entity, PrimaryColumn } from 'typeorm';

@Entity({ schema: 'league' })
export class Person {
  @PrimaryColumn('uuid')
  @IsUUID()
  id: string;

  @Column()
  name: string;

  @Column()
  last_name: string;

  @Column()
  phone: string;

  @Column()
  email: string;

  @Column()
  dob: Date;

  constructor(
    id: string,
    name: string,
    last_name: string,
    phone: string,
    email: string,
    dob: Date,
  ) {
    this.id = id;
    this.name = name;
    this.last_name = last_name;
    this.phone = phone;
    this.email = email;
    this.dob = dob;
  }
}

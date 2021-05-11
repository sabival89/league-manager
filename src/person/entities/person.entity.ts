import { MemberRole } from '../../core/enums/member-role.enum';
import { MemberStatus } from '../../core/enums/member-status.enum';
import { Column, Entity, PrimaryColumn, TableInheritance } from 'typeorm';

@Entity({ schema: 'league' })
@TableInheritance({ column: { type: 'varchar', name: 'type' } })
export class Person {
  @PrimaryColumn('uuid', { unique: true })
  id: string;

  @Column()
  name: string;

  @Column()
  last_name: string;

  @Column()
  phone: string;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'date' })
  dob: Date;

  @Column({ type: 'enum', enum: MemberRole })
  role: MemberRole;

  @Column({ type: 'enum', enum: MemberStatus, default: MemberStatus.active })
  status: MemberStatus;

  @Column()
  age: number;

  constructor(
    id: string,
    name: string,
    last_name: string,
    phone: string,
    email: string,
    dob: Date,
    role: MemberRole,
    age: number,
    status: MemberStatus,
  ) {
    this.id = id;
    this.name = name;
    this.last_name = last_name;
    this.phone = phone;
    this.email = email;
    this.dob = dob;
    this.role = role;
    this.age = age;
    this.status = status;
  }
}

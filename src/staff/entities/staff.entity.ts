import { MemberRoleEnum } from '../../core/enums/member-role.enum';
import { MemberStatusEnum } from '../../core/enums/member-status.enum';
import { Person } from '../../person/entities/person.entity';
import { ChildEntity, Column } from 'typeorm';

@ChildEntity()
export class Staff extends Person {
  @Column({ default: 0 })
  wage: number;

  @Column({ type: Date })
  hire_date: Date;

  constructor(
    id: string,
    name: string,
    last_name: string,
    phone: string,
    email: string,
    dob: Date,
    role: MemberRoleEnum,
    status?: MemberStatusEnum,
    wage?: number,
    hire_date?: Date,
  ) {
    super(id, name, last_name, phone, email, dob, role, status);
    this.status = status ?? MemberStatusEnum.inactive;
    this.wage = wage ?? 20;
    this.hire_date = hire_date;
  }
}

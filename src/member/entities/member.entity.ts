import { MemberRole } from '../../core/enums/member-role.enum';
import { MemberStatus } from '../../core/enums/member-status.enum';
import { Person } from '../../person/entities/person.entity';
import { ChildEntity, Column, OneToOne } from 'typeorm';
import { Team } from '../../team/entities/team.entity';

@ChildEntity()
export class Member extends Person {
  @Column({ default: 0 })
  balance: number;

  @Column()
  @OneToOne(() => Team, (teamId) => teamId.id)
  team_id: string;

  @Column({ type: 'jsonb', default: { shotsOnGoal: 0 } })
  stats: { shotsOnGoal: number };

  constructor(
    id?: string,
    name?: string,
    last_name?: string,
    phone?: string,
    email?: string,
    dob?: Date,
    role?: MemberRole,
    status?: MemberStatus,
    balance?: number,
    team_id?: string,
    stats?: { shotsOnGoal: number },
  ) {
    super(id, name, last_name, phone, email, dob, role, status);
    this.role = role;
    this.status = status ?? MemberStatus.inactive;
    this.balance = balance;
    this.team_id = team_id;
    this.stats = stats;
  }
}

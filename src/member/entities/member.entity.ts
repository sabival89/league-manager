import { MemberRoleEnum } from '../../core/enums/member-role.enum';
import { MemberStatusEnum } from '../../core/enums/member-status.enum';
import { Person } from '../../person/entities/person.entity';
import { ChildEntity, Column, JoinColumn, ManyToOne } from 'typeorm';
import { Team } from '../../team/entities/team.entity';

@ChildEntity()
export class Member extends Person {
  @Column({ default: 0 })
  balance: number;

  @Column({ type: 'uuid', unique: false })
  @JoinColumn({ name: 'team_id' })
  team_id: string;

  @Column({ type: 'jsonb', default: { shotsOnGoal: 0 } })
  stats: { shotsOnGoal: number };

  @ManyToOne(() => Team, {
    onDelete: 'SET NULL',
  })
  team: Team;

  constructor(
    id: string,
    name: string,
    last_name: string,
    phone: string,
    email: string,
    dob: Date,
    role: MemberRoleEnum,
    status?: MemberStatusEnum,
    balance?: number,
    team_id?: string,
    stats?: { shotsOnGoal: number },
  ) {
    super(id, name, last_name, phone, email, dob, role, status);
    this.role = role ?? MemberRoleEnum.striker;
    this.status = status ?? MemberStatusEnum.inactive;
    this.balance = balance ?? 100;
    this.team_id = team_id;
    this.stats = stats;
  }
}

import { MemberRole } from '../../core/enums/member-role.enum';
import { MemberStatus } from '../../core/enums/member-status.enum';
import { Person } from '../../person/entities/person.entity';
import { Column, Entity, OneToOne, PrimaryColumn } from 'typeorm';
import { Team } from '../../team/entities/team.entity';
import { IsUUID } from 'class-validator';

@Entity({ schema: 'league' })
export class Member {
  @PrimaryColumn('uuid')
  @IsUUID()
  id: string;

  @Column()
  @IsUUID()
  @OneToOne(() => Person, (person_id) => person_id.id)
  person_id: string;

  @Column({ type: 'enum', enum: MemberRole })
  role: MemberRole;

  @Column({ type: 'enum', enum: MemberStatus })
  status?: MemberStatus;

  @Column({ default: 0 })
  balance?: number;

  @Column()
  @OneToOne(() => Team, (teamId) => teamId.id)
  // @JoinColumn()
  team_id?: string;

  @Column({ type: 'simple-json' })
  stats?: { shotsOnGoal: number };

  constructor(
    id: string,
    person_id: string,
    role: MemberRole,
    status: MemberStatus,
    balance: number,
    team_id: string,
    stats: { shotsOnGoal: number },
  ) {
    this.id = id;
    this.person_id = person_id;
    this.role = role;
    this.status = status ?? MemberStatus.active;
    this.balance = balance ?? 0;
    this.team_id = team_id ?? null;
    this.stats = stats ?? { shotsOnGoal: 0 };
  }
}

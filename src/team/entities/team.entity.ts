import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { Member } from '../../member/entities/member.entity';
import { TeamStatusEnum } from '../../core/enums/team-status.enum';

@Entity({ schema: 'league' })
export class Team {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ type: 'uuid' })
  @OneToOne(() => Member, (member) => member.id, { onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'coach' })
  coach: string;

  @Column({ type: 'uuid', nullable: true })
  @OneToOne(() => Member, (member) => member.id, { onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'captain' })
  captain: string;

  @Column({
    type: 'enum',
    enum: TeamStatusEnum,
    default: TeamStatusEnum.inactive,
  })
  status: TeamStatusEnum;

  @OneToMany(() => Member, (member) => member.team_id, { onUpdate: 'CASCADE' })
  member: Member[];

  constructor(
    id: string,
    name: string,
    coach: string,
    captain: string,
    status: TeamStatusEnum,
  ) {
    this.id = id;
    this.name = name;
    this.coach = coach;
    this.captain = captain;
    this.status = status;
  }
}

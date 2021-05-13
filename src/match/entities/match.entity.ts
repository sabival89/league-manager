import { Team } from '../../team/entities/team.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryColumn,
} from 'typeorm';
import { LocationEnum } from '../../core/enums/location.enum';
import { Staff } from '../../staff/entities/staff.entity';

@Entity({ schema: 'league' })
export class Match {
  @PrimaryColumn('uuid')
  id: string;

  @Column('uuid', { unique: false })
  @ManyToOne(() => Team, (team) => team.id)
  @JoinColumn({ name: 'home' })
  home: string;

  @Column('uuid')
  @ManyToOne(() => Team, (team) => team.id)
  @JoinColumn({ name: 'away' })
  away: string;

  @Column()
  home_score: number;

  @Column()
  away_score: number;

  @Column()
  played: Date;

  @Column({ type: 'enum', enum: LocationEnum })
  location: LocationEnum;

  @Column({ type: 'uuid' })
  @OneToOne(() => Staff, (staff) => staff.id, { onUpdate: 'CASCADE' })
  @JoinColumn({ name: 'referee' })
  referee: string;

  constructor(
    id: string,
    home: string,
    away: string,
    home_score: number,
    away_score: number,
    played: Date,
    location: LocationEnum,
    referee: string,
  ) {
    this.id = id;
    this.home = home;
    this.away = away;
    this.home_score = home_score;
    this.away_score = away_score;
    this.played = played;
    this.location = location;
    this.referee = referee;
  }
}

import { MemberStatus } from '../../core/enums/member-status.enum';
import { Team } from '../../team/entities/team.entity';
import { Column, Entity, ManyToMany, PrimaryColumn } from 'typeorm';

@Entity({ schema: 'league' })
export class Match {
  @PrimaryColumn('uuid')
  id: string;

  @PrimaryColumn('uuid')
  @ManyToMany(() => Team)
  home: string;

  @PrimaryColumn('uuid')
  @ManyToMany(() => Team)
  team: string;

  @Column()
  homeScore: number;

  @Column()
  awayScore: number;

  @Column()
  played: string;

  @Column()
  location: MemberStatus;
}

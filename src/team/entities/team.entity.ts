import { MemberStatus } from '../../core/enums/member-status.enum';
import { Column, Entity, OneToOne, PrimaryColumn } from 'typeorm';
import { Member } from '../../member/entities/member.entity';

@Entity({ schema: 'league' })
export class Team {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @OneToOne(() => Member)
  @Column()
  coach: string;

  @OneToOne(() => Member)
  @Column()
  captain?: string;

  @Column()
  status: MemberStatus;
}

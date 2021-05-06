import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsMilitaryTime } from 'class-validator';
import { MemberStatus } from '../../core/enums/member-status.enum';

export class CreateMatchDto {
  @ApiProperty()
  home: string;

  @ApiProperty()
  team: string;

  @ApiProperty()
  homeScore: number;

  @ApiProperty()
  awayScore: number;

  @IsMilitaryTime()
  @ApiProperty()
  played: string;

  @IsEnum(MemberStatus)
  location: string;
}

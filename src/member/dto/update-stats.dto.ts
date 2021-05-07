import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { UpdateMemberDto } from './update-member.dto';

export class StatsAttributes {
  @ApiProperty()
  shotsOnGoal: number;
}
export class UpdateMemberStatsDto extends UpdateMemberDto {
  @ApiProperty()
  @Type(() => StatsAttributes)
  @ValidateNested()
  stats?: StatsAttributes;
}

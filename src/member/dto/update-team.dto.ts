import { ApiProperty } from '@nestjs/swagger';
import { IsUUID } from 'class-validator';
import { UpdateMemberDto } from './update-member.dto';

export class UpdateMemberTeamDto extends UpdateMemberDto {
  @ApiProperty()
  @IsUUID()
  team_id: string;
}

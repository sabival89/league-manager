import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { CreateMemberDto } from './create-member.dto';

export class UpdateMemberDto extends PartialType(CreateMemberDto) {
  @ApiProperty({ example: 'facb671e-d4de-4c17-a347-b790b0b09596' })
  @IsOptional()
  team_id?: string;
}

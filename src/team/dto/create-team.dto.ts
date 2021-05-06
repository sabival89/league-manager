import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsUUID } from 'class-validator';
import { MemberStatus } from '../../core/enums/member-status.enum';

export class CreateTeamDto {
  @ApiProperty()
  name: string;

  @ApiProperty()
  @IsUUID()
  coach: string;

  @ApiProperty()
  @IsUUID()
  captain: string;

  @ApiProperty({ example: 'active | inactive' })
  @IsEnum(MemberStatus)
  status: string;
}

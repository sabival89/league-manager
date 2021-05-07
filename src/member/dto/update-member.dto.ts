import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { MemberRole } from 'src/core/enums/member-role.enum';
import { CreateMemberDto } from './create-member.dto';

export class UpdateMemberDto extends CreateMemberDto {
  @ApiProperty()
  @IsOptional()
  name: string;

  @IsOptional()
  last_name: string;

  @IsOptional()
  phone: string;

  @IsOptional()
  email: string;

  @IsOptional()
  dob: Date;

  @IsOptional()
  role: MemberRole;
}

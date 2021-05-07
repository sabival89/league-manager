import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { MemberStatus } from '../../core/enums/member-status.enum';
import { EnumProps } from '../../core/enums/utilities/enum-properties.enum';

export class UpdateMemberStatusDto {
  @ApiProperty({ example: EnumProps.joinEnum(MemberStatus, '|') })
  @IsEnum(MemberStatus, {
    message: `Status must match one of the following: ${EnumProps.joinEnum(
      MemberStatus,
      'OR',
    )}`,
  })
  status?: MemberStatus;
}

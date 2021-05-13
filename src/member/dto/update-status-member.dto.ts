import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { MemberStatusEnum } from '../../core/enums/member-status.enum';
import { EnumProps } from '../../core/utilities/enum-properties.enum';

export class UpdateMemberStatusDto {
  @ApiProperty({ example: EnumProps.joinEnum(MemberStatusEnum) })
  @IsEnum(MemberStatusEnum, {
    message: `Status must match one of the following: ${EnumProps.joinEnum(
      MemberStatusEnum,
      'OR',
    )}`,
  })
  status?: MemberStatusEnum;
}

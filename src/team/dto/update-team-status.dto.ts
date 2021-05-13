import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { TeamStatusEnum } from '../../core/enums/team-status.enum';
import { EnumProps } from '../../core/utilities/enum-properties.enum';

export class UpdateTeamStatusDto {
  @ApiProperty({ example: EnumProps.joinEnum(TeamStatusEnum) })
  @IsEnum(TeamStatusEnum, {
    message: `Status must match one of the folowing: ${EnumProps.joinEnum(
      TeamStatusEnum,
    )}`,
  })
  status: TeamStatusEnum;
}
TeamStatusEnum;

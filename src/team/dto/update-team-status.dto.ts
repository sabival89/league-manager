import { ApiProperty } from '@nestjs/swagger';
import { IsEnum } from 'class-validator';
import { TeamStatus } from 'src/core/enums/team-status.enum';
import { EnumProps } from 'src/core/enums/utilities/enum-properties.enum';

export class UpdateTeamStatusDto {
  @ApiProperty({ example: EnumProps.joinEnum(TeamStatus) })
  @IsEnum(TeamStatus, {
    message: `Status must match one of the folowing: ${EnumProps.joinEnum(
      TeamStatus,
    )}`,
  })
  status: TeamStatus;
}

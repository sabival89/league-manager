import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsUUID, Matches, Min, ValidateNested } from 'class-validator';
import { CreatePersonDto } from '../../person/dto/create-person.dto';
import { MemberRole } from '../../core/enums/member-role.enum';
import { MemberStatus } from '../../core/enums/member-status.enum';
import { Type } from 'class-transformer';

export class MatchEnum {
  public static match(enumObj: any) {
    return new RegExp(
      `^${Object.values(enumObj)
        .filter((v) => typeof v !== 'number')
        .join('|')}$ i`,
    );
  }
}

export class StatsAttributes {
  @ApiProperty()
  shotsOnGoal: number;
}

export class CreateMemberPersonDto extends CreatePersonDto {
  @ApiProperty({
    example: Object.keys(MemberRole).join(' | '),
    description: 'Select only one of the following roles',
  })
  @Matches(MatchEnum.match(MemberRole))
  @IsEnum(MemberRole, {
    message: `Role must match one of the following: ${Object.keys(
      MemberRole,
    ).join(' | ')}`,
  })
  role: MemberRole;
}

export class CreateMemberDto {
  @ApiProperty()
  @IsUUID()
  person_id: string;

  @ApiProperty()
  @Matches(MatchEnum.match(MemberRole))
  @IsEnum(MemberRole, {
    message: `Role must match one of the following: ${Object.keys(
      MemberStatus,
    ).join(' | ')}`,
  })
  role: MemberRole;

  @ApiProperty({ example: Object.keys(MemberStatus).join(' | ') })
  @Matches(MatchEnum.match(MemberStatus))
  @IsEnum(MemberStatus, {
    message: `Status must match one of the following: ${Object.keys(
      MemberStatus,
    ).join(' | ')}`,
  })
  status?: MemberStatus;

  @ApiProperty()
  @Min(0)
  balance?: number;

  @ApiProperty()
  @IsUUID()
  team_id?: string;

  @ApiProperty()
  @Type(() => StatsAttributes)
  @ValidateNested()
  stats?: StatsAttributes;
}

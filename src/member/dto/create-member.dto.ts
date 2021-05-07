import { CreatePersonDto } from '../../person/dto/create-person.dto';

// export class MatchEnum {
//   public static match(enumObj: any) {
//     return new RegExp(
//       `^${Object.values(enumObj)
//         .filter((v) => typeof v !== 'number')
//         .join('|')}$ i`,
//     );
//   }
// }

export class CreateMemberDto extends CreatePersonDto {}

// import { ApiProperty } from '@nestjs/swagger';
// import {
//   IsEnum,
//   IsOptional,
//   IsUUID,
//   Matches,
//   Min,
//   ValidateNested,
// } from 'class-validator';
// import { MemberRole } from '../../core/enums/member-role.enum';
// import { MemberStatus } from '../../core/enums/member-status.enum';
// import { Type } from 'class-transformer';

// export class MatchEnum {
//   public static match(enumObj: any) {
//     return new RegExp(
//       `^${Object.values(enumObj)
//         .filter((v) => typeof v !== 'number')
//         .join('|')}$ i`,
//     );
//   }
// }

// export class StatsAttributes {
//   @ApiProperty()
//   shotsOnGoal: number;
// }

// export class CreateMemberDto {
//   @ApiProperty()
//   @Matches(MatchEnum.match(MemberRole), {
//     message: `Role must match one of the following: ${Object.keys(
//       MemberRole,
//     ).join(' | ')}`,
//   })
//   // @IsEnum(MemberRole)
//   role: MemberRole;

//   @ApiProperty({ example: Object.keys(MemberStatus).join(' | ') })
//   @IsOptional()
//   @Matches(MatchEnum.match(MemberStatus), {
//     message: `Status must match one of the following: ${Object.keys(
//       MemberStatus,
//     ).join(' | ')}`,
//   })
//   // @IsEnum(MemberStatus, { message: '' })
//   status?: MemberStatus;

//   @ApiProperty()
//   @IsOptional()
//   @Min(0)
//   balance?: number;

//   @ApiProperty()
//   @IsUUID()
//   @IsOptional()
//   team_id?: string;

//   @ApiProperty()
//   @Type(() => StatsAttributes)
//   @ValidateNested()
//   @IsOptional()
//   stats?: StatsAttributes;
// }

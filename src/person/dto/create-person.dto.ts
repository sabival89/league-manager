import { ApiProperty } from '@nestjs/swagger';
import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsMobilePhone,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { MemberRole } from 'src/core/enums/member-role.enum';
import { EnumProps } from 'src/core/enums/utilities/enum-properties.enum';

export class CreatePersonDto {
  @ApiProperty({ example: 'Valentine' })
  @MinLength(3)
  @MaxLength(25)
  name: string;

  @ApiProperty({ example: 'Aduaka' })
  @MinLength(3)
  @MaxLength(25)
  last_name: string;

  @ApiProperty({ example: '5756390000', required: false })
  @IsMobilePhone('en-US')
  phone: string;

  @ApiProperty({ example: 'user@domain.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'YYYY-MM-DD' })
  @IsDateString({ strict: true })
  dob: Date;

  @ApiProperty({ example: EnumProps.joinEnum(MemberRole) })
  @IsEnum(MemberRole, {
    message: `Role must match one of the following: ${EnumProps.joinEnum(
      MemberRole,
      'OR',
    )}`,
  })
  role: MemberRole;

  @ApiProperty({ example: 19 })
  @Min(18)
  age: number;
}

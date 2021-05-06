import { ApiProperty } from '@nestjs/swagger';
import {
  IsDate,
  IsEmail,
  IsISO8601,
  IsMobilePhone,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreatePersonDto {
  @ApiProperty({ example: 'Valentine' })
  @MinLength(3)
  @MaxLength(25)
  name: string;

  @ApiProperty({ example: 'Aduaka' })
  @MinLength(3)
  @MaxLength(25)
  last_name: string;

  @ApiProperty({ example: '5756390000' })
  @IsMobilePhone('en-US')
  phone: string;

  @ApiProperty({ example: 'user@domain.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ example: 'YYYY-MM-DD' })
  @IsISO8601({ strict: true })
  dob: Date;
}

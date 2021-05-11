import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsEnum, IsUUID, Max, Min } from 'class-validator';
import { LocationEnum } from '../../core/enums/location.enum';
import { EnumProps } from '../../core/enums/utilities/enum-properties.enum';

export class CreateMatchDto {
  @ApiProperty({ example: '6c7eff25-f0e7-4e55-ab44-782695dc3ac4' })
  @IsUUID()
  home: string;

  @ApiProperty({ example: '6c7eff25-f0e7-4e55-ab44-782695dc3ac4' })
  @IsUUID()
  away: string;

  @ApiProperty()
  @Min(0)
  @Max(20)
  home_score: number;

  @ApiProperty()
  @Min(0)
  @Max(20)
  away_score: number;

  @IsDateString()
  @ApiProperty({ example: 'YYYY-MM-DD HH:MM' })
  played: Date;

  @ApiProperty({
    example: `${EnumProps.joinEnum(LocationEnum, 'OR')}`,
    required: true,
  })
  @IsEnum(LocationEnum, {
    message: `Location must match one of the following: ${EnumProps.joinEnum(
      LocationEnum,
      'OR',
    )}`,
  })
  location: LocationEnum;
}

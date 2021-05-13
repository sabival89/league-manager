import { ApiProperty, PartialType } from '@nestjs/swagger';
import { IsDateString, Min } from 'class-validator';
import { CreateStaffDto } from './create-staff.dto';

export class UpdateStaffDto extends PartialType(CreateStaffDto) {
  @ApiProperty()
  @Min(0)
  wage: number;

  @ApiProperty({ example: 'YYYY-MM-DD' })
  @IsDateString()
  hire_date: Date;
}

import { ApiProperty } from '@nestjs/swagger';
import { Min } from 'class-validator';

export class CreateMemberPaymentDto {
  @ApiProperty()
  @Min(0)
  balance?: number;
}

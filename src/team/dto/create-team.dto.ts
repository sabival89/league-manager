import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsUUID } from 'class-validator';

export class CreateTeamDto {
  @ApiProperty()
  name: string;

  @ApiProperty({ example: 'fd04aa32-6fcb-48f6-9d73-dbe00c6db2da' })
  @IsUUID()
  coach: string;

  @ApiProperty({
    example: 'fd04aa32-6fcb-48f6-9d73-dbe00c6db2da',
    required: false,
  })
  @IsUUID()
  @IsOptional()
  captain: string;
}

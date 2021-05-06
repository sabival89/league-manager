import { ApiProperty } from '@nestjs/swagger';

export class TeamStats {
  @ApiProperty()
  win: number;

  @ApiProperty()
  loss: number;

  @ApiProperty()
  players: number;

  @ApiProperty()
  matches: number;
}

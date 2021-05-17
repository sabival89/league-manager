import { ApiProperty } from '@nestjs/swagger';

export class TeamStatsResponse {
  @ApiProperty()
  win: number;

  @ApiProperty()
  loss: number;

  @ApiProperty()
  players: number;

  @ApiProperty()
  matches: number;
}

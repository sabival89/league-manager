import { Injectable } from '@nestjs/common';
import { MemberRole } from '../core/enums/member-role.enum';
import { MemberStatus } from '../core/enums/member-status.enum';
import { CreateTeamDto } from './dto/create-team.dto';
import { UpdateTeamDto } from './dto/update-team.dto';

@Injectable()
export class TeamService {
  createTeam(createTeamDto: CreateTeamDto) {
    return 'This action adds a new team';
  }

  findOneTeam(id: number) {
    return `This action returns a #${id} team`;
  }

  findTeamMatches(id: number) {
    return `This action returns a #${id} team`;
  }

  findTeamStats(id: number) {
    return `This action returns a #${id} team`;
  }

  findTeamMembers(id: string, role?: MemberRole, status?: MemberStatus) {
    return `This action returns a #${id} team`;
  }

  updateTeam(id: number, updateTeamDto: UpdateTeamDto) {
    return `This action updates a #${id} team`;
  }

  updateTeamStatus(id: number, updateTeamDto: UpdateTeamDto) {
    return `This action updates a #${id} team`;
  }

  removeTeam(id: number) {
    return `This action removes a #${id} team`;
  }
}

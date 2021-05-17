import { CreateStaffDto } from '../dto/create-staff.dto';
import { Staff } from '../entities/staff.entity';
import { vs as uuidv4 } from 'uuid';
import { UpdateStaffDto } from '../dto/update-staff.dto';
import { UpdateMemberStatusDto } from '../../member/dto/update-status-member.dto';

export class StaffMapper {
  public static toDomain(raw: CreateStaffDto): Staff {
    return new Staff(
      uuidv4().toString(),
      raw.name,
      raw.last_name,
      raw.phone,
      raw.email,
      raw.dob,
      raw.role,
    );
  }

  public static toUpdateDomain(
    staffId: string,
    raw: UpdateStaffDto & UpdateMemberStatusDto,
  ): Staff {
    return new Staff(
      staffId,
      raw.name,
      raw.last_name,
      raw.phone,
      raw.email,
      raw.dob,
      raw.role,
      raw.status,
      raw.wage,
      raw.hire_date,
    );
  }
}

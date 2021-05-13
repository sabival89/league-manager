import { EntityRepository, Repository } from 'typeorm';
import { Staff } from '../entities/staff.entity';

@EntityRepository(Staff)
export class StaffRepository extends Repository<Staff> {}

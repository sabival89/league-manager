import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { League_OKException } from 'src/core/exceptions/league-ok.exception';
import { PersonMapper } from 'src/person/mappers/person.map';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { StaffMapper } from './mapper/staff.map';
import { StaffRepository } from './repository/staff.repository';

@Injectable()
export class StaffService {
  /**
   * Inject Dependencies
   * @param staffRepository
   */
  constructor(
    @InjectRepository(StaffRepository)
    private staffRepository: StaffRepository,
  ) {}

  /**
   *
   * @param createStaffDto
   * @returns
   */
  async createStaff(createStaffDto: CreateStaffDto) {
    return await this.staffRepository
      .save(PersonMapper.toDomain(createStaffDto))
      .then(
        async (staff) =>
          new League_OKException({
            status: 'Staff was successfully created',
            staff_id: staff.id,
          }),
      )
      .catch(async (error) => new InternalServerErrorException(error.detail));
  }

  /**
   * Retrieve all staff info
   * @returns
   */
  async findAllStaff() {
    return await this.staffRepository
      .find()
      .catch((error) => new InternalServerErrorException(error.message));
  }

  /**
   * Retrieve a given staff info
   * @param staffId
   * @returns
   */
  async findOneStaff(staffId: string) {
    return await this.staffRepository
      .findOneOrFail({
        where: { id: staffId },
      })
      .then((staff) => staff)
      .catch(
        (error) =>
          new InternalServerErrorException({
            message: 'Member not found',
            description: error,
          }),
      );
  }

  /**
   * Update a given staff's info
   * @param staffId
   * @param updateStaffDto
   * @returns
   */
  async updateStaff(staffId: string, updateStaffDto: UpdateStaffDto) {
    return await this.staffRepository
      .findOneOrFail(staffId)
      .then(async (staff) => {
        return await this.staffRepository
          .save(
            StaffMapper.toUpdateDomain(staffId, {
              ...staff,
              ...updateStaffDto,
            }),
          )
          .then(() => new League_OKException('Update was successfully'))
          .catch((error) => new InternalServerErrorException(error.message));
      })
      .catch(() => new NotFoundException('Member does not exist'));
  }

  /**
   * Remove a given staff
   * @param staffId
   * @returns
   */
  async removeStaff(staffId: string) {
    return await this.staffRepository
      .findOneOrFail(staffId)
      .then(async (staff) => {
        return await this.staffRepository
          .remove(staff)
          .then(() => new League_OKException('Staff was deleted successfully'))
          .catch((error) => new InternalServerErrorException(error.message));
      })
      .catch(() => new NotFoundException('Staff does not exist'));
  }
}

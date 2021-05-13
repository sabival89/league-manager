import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';
import { StaffService } from './staff.service';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { ApiTags } from '@nestjs/swagger';
import { ValidationPipe } from '../member/pipes/league-validation.pipe';

@ApiTags('Staff')
@Controller('staff')
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  /**
   * Handler for creating a new staff
   * @param createStaffDto
   * @returns
   */
  @Post()
  create(@Body(new ValidationPipe()) createStaffDto: CreateStaffDto) {
    return this.staffService.createStaff(createStaffDto);
  }

  /**
   *Handler for retrieving all staff informaltion
   * @returns
   */
  @Get()
  findAll() {
    return this.staffService.findAllStaff();
  }

  /**
   * Handler for retriving a given staff's information
   * @param staffId
   * @returns
   */
  @Get(':id')
  findOne(@Param('id', ParseUUIDPipe) staffId: string) {
    return this.staffService.findOneStaff(staffId);
  }

  /**
   * Handler for
   * @param staffId
   * @param updateStaffDto
   * @returns
   */
  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) staffId: string,
    @Body(new ValidationPipe()) updateStaffDto: UpdateStaffDto,
  ) {
    return this.staffService.updateStaff(staffId, updateStaffDto);
  }

  /**
   *
   * @param staffId
   * @returns
   */
  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) staffId: string) {
    return this.staffService.removeStaff(staffId);
  }
}

import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
  HttpException,
} from '@nestjs/common';
import { StaffService } from './staff.service';
import { CreateStaffDto } from './dto/create-staff.dto';
import { UpdateStaffDto } from './dto/update-staff.dto';
import { ApiTags } from '@nestjs/swagger';
import { ValidationPipe } from '../member/pipes/league-validation.pipe';
import { Staff } from './entities/staff.entity';

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
  async create(@Body(new ValidationPipe()) createStaffDto: CreateStaffDto):Promise<HttpException> {
    return await this.staffService.createStaff(createStaffDto);
  }

  /**
   *Handler for retrieving all staff informaltion
   * @returns
   */
  @Get()
  async findAll():Promise<HttpException | Array<Staff>>  {
    return await this.staffService.findAllStaff();
  }

  /**
   * Handler for retriving a given staff's information
   * @param staffId
   * @returns
   */
  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) staffId: string):Promise<Staff | HttpException> {
    return await this.staffService.findOneStaff(staffId);
  }

  /**
   * Handler for
   * @param staffId
   * @param updateStaffDto
   * @returns
   */
  @Patch(':id')
  async update(
    @Param('id', ParseUUIDPipe) staffId: string,
    @Body(new ValidationPipe()) updateStaffDto: UpdateStaffDto,
  ): Promise<HttpException> {
    return await this.staffService.updateStaff(staffId, updateStaffDto);
  }

  /**
   *
   * @param staffId
   * @returns
   */
  @Delete(':id')
  async remove(@Param('id', ParseUUIDPipe) staffId: string):Promise<HttpException> {
    return await this.staffService.removeStaff(staffId);
  }
}

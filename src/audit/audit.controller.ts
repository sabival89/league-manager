import { Controller, Get, Param, ParseUUIDPipe } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuditService } from './audit.service';

@ApiTags('Audit')
@Controller('audit')
export class AuditController {
  constructor(private readonly auditService: AuditService) {}

  /**
   * Handler for retrieving all audit info
   * @returns
   */
  @Get()
  findAllStaff() {
    return this.auditService.findAll();
  }

  /**
   * Handler for retrieving one audit info
   * @param auditId
   * @returns
   */
  @Get(':id')
  findOneStaff(@Param('id', ParseUUIDPipe) auditId: string) {
    return this.auditService.findOne(auditId);
  }
}

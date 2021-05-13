import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuditRepository } from './repositories/audit.repository';

@Injectable()
export class AuditService {
  /**
   * Inject dependencies
   * @param auditRepository
   */
  constructor(
    @InjectRepository(AuditRepository) private auditRepository: AuditRepository,
  ) {}

  /**
   * Retrieve all audits
   * @returns
   */
  async findAll() {
    return await this.auditRepository
      .find()
      .catch((error) => new InternalServerErrorException(error.message));
  }

  /**
   * Retrive a given audit
   * @param auditId
   * @returns
   */
  async findOne(auditId: string) {
    return await this.auditRepository
      .findOneOrFail({
        where: { id: auditId },
      })
      .then((member) => member)
      .catch(
        (error) =>
          new InternalServerErrorException({
            message: 'Member not found',
            description: error,
          }),
      );
  }
}

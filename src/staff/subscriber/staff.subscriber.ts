import { InjectRepository } from '@nestjs/typeorm';
import { AuditRepository } from '../../audit/repositories/audit.repository';
import { AppEntityActionEnum } from '../../core/enums/app-entity-action.enum';
import { AppEntityEnum } from '../../core/enums/app-entity.enum';
import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  RemoveEvent,
  UpdateEvent,
} from 'typeorm';
import { Staff } from '../entities/staff.entity';
import auditEvent from '../../core/utilities/audit-event';

@EventSubscriber()
export class StaffSubscriber implements EntitySubscriberInterface<Staff> {
  private readonly entity: AppEntityEnum = AppEntityEnum.Staff;

  /**
   * Register class to the typeorm subscriber engine
   * @param connection
   */
  constructor(
    connection: Connection,
    @InjectRepository(AuditRepository) private auditRepository: AuditRepository,
  ) {
    connection.subscribers.push(this);
  }

  /**
   * Entity to listen to
   * @returns
   */
  listenTo() {
    return Staff;
  }

  /**
   * Audit action to perform after inserts
   * @param event
   */
  afterInsert(event: InsertEvent<any>) {
    auditEvent(this.auditRepository, event, {
      entity: this.entity,
      action: AppEntityActionEnum.Insert,
    });
  }

  /**
   * Audit action to perform after updates
   * @param event
   */
  afterUpdate(event: UpdateEvent<any>) {
    auditEvent(this.auditRepository, event, {
      entity: this.entity,
      action: AppEntityActionEnum.Update,
    });
  }

  /**
   * Audit action to perform after removals/deletions
   * @param event
   */
  afterRemove(event: RemoveEvent<any>) {
    auditEvent(this.auditRepository, event, {
      entity: this.entity,
      action: AppEntityActionEnum.Delete,
    });
  }
}

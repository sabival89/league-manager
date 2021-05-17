import { InjectRepository } from '@nestjs/typeorm';
import { AuditRepository } from 'src/audit/repositories/audit.repository';
import { AppEntityActionEnum } from 'src/core/enums/app-entity-action.enum';
import { AppEntityEnum } from 'src/core/enums/app-entity.enum';
import auditEvent from 'src/core/utilities/audit-event';
import {
  Connection,
  EntitySubscriberInterface,
  EventSubscriber,
  InsertEvent,
  RemoveEvent,
  UpdateEvent,
} from 'typeorm';
import { Member } from '../entities/member.entity';

@EventSubscriber()
export class MemberSubscriber implements EntitySubscriberInterface<Member> {
  /**
   * The subject entity to register in Audit
   */
  private readonly entity: AppEntityEnum = AppEntityEnum.Member;

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
    return Member;
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

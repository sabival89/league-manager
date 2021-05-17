import { PartialType } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { Audit } from '../../audit/entities/audit.entity';
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
import { Match } from '../entities/match.entity';
import { AuditMapper } from 'src/audit/mapper/audit.map';
import nowDate from 'src/core/utilities/get-date';
import leagueLogger from 'src/core/utilities/logger';

@EventSubscriber()
export class MatchSubscriber implements EntitySubscriberInterface<Match> {
  private readonly entity: AppEntityEnum = AppEntityEnum.Match;

  /**
   * Register class to the typeorm subscriber engine
   * @param connection
   */
  constructor(
    connection: Connection,
    @InjectRepository(AuditRepository)
    private auditRepository: AuditRepository,
  ) {
    connection.subscribers.push(this);
  }

  /**
   * Entity to listen to
   * @returns
   */
  listenTo() {
    return Match;
  }

  /**
   * Audit action to perform after inserts
   * @param event
   */
  afterInsert(event: InsertEvent<any>) {
    this.auditEvent(event, {
      entity: this.entity,
      action: AppEntityActionEnum.Insert,
    });
  }

  /**
   * Audit action to perform after updates
   * @param event
   */
  afterUpdate(event: UpdateEvent<any>) {
    this.auditEvent(event, {
      entity: this.entity,
      action: AppEntityActionEnum.Update,
    });
  }

  /**
   * Audit action to perform after removals/deletions
   * @param event
   */
  afterRemove(event: RemoveEvent<any>) {
    this.auditEvent(event, {
      entity: this.entity,
      action: AppEntityActionEnum.Delete,
    });
  }

  /**
   * Audit action event
   * @param event Subscriver event
   * @param props Audit properties
   * @returns
   */
  async auditEvent(
    event: any,
    props: {
      entity: AppEntityEnum;
      action: AppEntityActionEnum;
    },
  ) {
    return this.auditRepository
      .save(
        AuditMapper.toDomain({
          id: null,
          entity: props.entity,
          action: props.action,
          new_value: event.entity,
          modified_at: nowDate().toString(),
        }),
      )
      .then(() =>
        leagueLogger(
          `${props.action ?? 'normal'}`,
          `New ${props.action} action on ${
            props.entity
          } entity at ${nowDate()}`,
        ),
      )
      .catch((error) => console.log(error));
  }
}

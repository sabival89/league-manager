import { AuditMapper } from 'src/audit/mapper/audit.map';
import { AuditRepository } from 'src/audit/repositories/audit.repository';
import { AppEntityActionEnum } from '../enums/app-entity-action.enum';
import { AppEntityEnum } from '../enums/app-entity.enum';
import nowDate from './get-date';
import leagueLogger from './logger';

/**
 * Audit action event
 * @param event Subscriver event
 * @param props Audit properties
 * @returns
 */

/**
 * Audit action event
 * @param repository The audit repository
 * @param event Subscriver event
 * @param props Audit properties
 * @returns
 */
const auditEvent = async (
  repository: AuditRepository,
  event: any,
  props: {
    entity: AppEntityEnum;
    action: AppEntityActionEnum;
  },
): Promise<void> => {
  return repository
    .save(
      AuditMapper.toDomain({
        id: null,
        entity: props.entity,
        action: props.action,
        new_value: event.entity,
        modified_at: nowDate().timestamp.toString(),
      }),
    )
    .then(() =>
      leagueLogger(
        `${props.action ?? 'normal'}`,
        `New ${props.action} action on ${
          props.entity
        } entity at ${nowDate().timestamp.toString()}`,
      ),
    )
    .catch((error) => console.log(error));
};

export default auditEvent;

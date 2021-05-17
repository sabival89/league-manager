import { AppEntityActionEnum } from 'src/core/enums/app-entity-action.enum';
import { AppEntityEnum } from 'src/core/enums/app-entity.enum';

export class CreateAuditDto {
  id: string;
  entity: AppEntityEnum;
  action: AppEntityActionEnum;
  new_value: string;
  modified_at: string;
}

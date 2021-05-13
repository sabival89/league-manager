import { AppEntityEnum } from '../../core/enums/app-entity.enum';
import { Column, Entity, PrimaryColumn } from 'typeorm';
import { AppEntityActionEnum } from '../../core/enums/app-entity-action.enum';

@Entity({ schema: 'league' })
export class Audit {
  @PrimaryColumn('uuid')
  id: string;

  @Column({ enum: AppEntityEnum })
  entity: AppEntityEnum;

  @Column({ enum: AppEntityActionEnum })
  action: AppEntityActionEnum;

  @Column({ type: 'jsonb' })
  new_value: string;

  @Column('timestamptz')
  modified_at: string;

  constructor(
    id: string,
    entity: AppEntityEnum,
    action: AppEntityActionEnum,
    new_value: string,
    modified_at: string,
  ) {
    this.id = id;
    this.entity = entity;
    this.action = action;
    this.new_value = new_value;
    this.modified_at = modified_at;
  }
}

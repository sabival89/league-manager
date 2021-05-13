import { CreateAuditDto } from '../dto/create-audit.dto';
import { Audit } from '../entities/audit.entity';
import { v4 as uuidv4 } from 'uuid';

export class AuditMapper {
  public static toDomain(raw: CreateAuditDto): Audit {
    return new Audit(
      uuidv4().toString(),
      raw.entity,
      raw.action,
      raw.new_value,
      raw.modified_at,
    );
  }
}

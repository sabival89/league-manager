import { MigrationInterface, QueryRunner } from 'typeorm';

export class statusEnum1620148696244 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE status AS ENUM (
        'active', 
        'inactive', 
        'suspended')`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP Type "status"`);
  }
}

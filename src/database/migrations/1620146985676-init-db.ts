import { MigrationInterface, QueryRunner } from 'typeorm';

export class initDb1620146985676 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('GRANT connect ON DATABASE league TO vaduaka;');
    await queryRunner.query('CREATE SCHEMA IF NOT EXISTS league;');
    await queryRunner.query('GRANT USAGE ON SCHEMA league TO vaduaka;');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DROP SCHEMA IF EXISTS league CASCADE;');
  }
}

import { MigrationInterface, QueryRunner } from 'typeorm';

export class teamTable1620149063306 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "league"."team" (
            "id" uuid NOT NULL PRIMARY KEY,
            "name" VARCHAR ( 50 ) UNIQUE NOT NULL,
            "coach" uuid NOT NULL,
            "captain" uuid,
            "status" status
            )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "team"`);
  }
}

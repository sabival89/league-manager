import { MigrationInterface, QueryRunner } from 'typeorm';

export class matchTable1620149961544 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "league"."match" (
            "id" uuid NOT NULL PRIMARY KEY,
            "home" uuid NOT NULL,
            "team" uuid NOT NULL,
            "captain" uuid,
            "home-score" INT NOT NULL,
            "away-score" INT NOT NULL,
            "played" TIMESTAMP NOT NULL,
            "location" status,
            "referee" uuid
            )`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "member"`);
  }
}

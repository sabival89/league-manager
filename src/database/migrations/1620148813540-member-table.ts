import { MigrationInterface, QueryRunner } from 'typeorm';

export class memberTable1620148813540 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "league"."member" (
        "id" uuid NOT NULL PRIMARY KEY, 
        "person_id" uuid NOT NULL, 
        "role" VARCHAR ( 50 ) NOT NULL, 
        "status" status,
        "balance" INT, 
        "team_id" uuid,
        "stats" json)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "member"`);
  }
}

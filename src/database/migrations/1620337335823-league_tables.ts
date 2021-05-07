import { MigrationInterface, QueryRunner } from 'typeorm';

export class leagueTables1620337335823 implements MigrationInterface {
  name = 'leagueTables1620337335823';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TYPE "league"."person_role_enum" AS ENUM('coach', 'defender', 'striker', 'keeper', 'midfielder')`,
    );
    await queryRunner.query(
      `CREATE TYPE "league"."person_status_enum" AS ENUM('active', 'inactive', 'suspended')`,
    );
    await queryRunner.query(
      `CREATE TABLE "league"."person" ("id" character varying NOT NULL, "name" character varying NOT NULL, "last_name" character varying NOT NULL, "phone" character varying NOT NULL, "email" character varying NOT NULL, "dob" date NOT NULL, "role" "league"."person_role_enum", "status" "league"."person_status_enum", "balance" integer DEFAULT '0', "team_id" character varying, "stats" jsonb, "type" character varying NOT NULL, CONSTRAINT "UQ_f1afee83e7625c5feb76dd574c2" UNIQUE ("email"), CONSTRAINT "PK_28d502b7fa8639086d924aab843" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_1f98f73c4b52d52a75b82096de" ON "league"."person" ("type") `,
    );
    await queryRunner.query(
      `CREATE TABLE "league"."team" ("id" character varying NOT NULL, "name" character varying NOT NULL, "coach" character varying NOT NULL, "captain" character varying NOT NULL, "status" character varying NOT NULL, CONSTRAINT "PK_814bf8fc899e0b812d811d3d2ea" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "league"."match" ("id" uuid NOT NULL, "home" uuid NOT NULL, "team" uuid NOT NULL, "home_score" integer NOT NULL, "away_score" integer NOT NULL, "played" character varying NOT NULL, "location" character varying NOT NULL, CONSTRAINT "PK_1018438f564611124a56e25a6a1" PRIMARY KEY ("id", "home", "team"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "league"."match"`);
    await queryRunner.query(`DROP TABLE "league"."team"`);
    await queryRunner.query(
      `DROP INDEX "league"."IDX_1f98f73c4b52d52a75b82096de"`,
    );
    await queryRunner.query(`DROP TABLE "league"."person"`);
    await queryRunner.query(`DROP TYPE "league"."person_status_enum"`);
    await queryRunner.query(`DROP TYPE "league"."person_role_enum"`);
  }
}

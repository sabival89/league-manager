import {MigrationInterface, QueryRunner} from "typeorm";

export class leagueTables1620925113620 implements MigrationInterface {
    name = 'leagueTables1620925113620'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "league"."audit" ("id" uuid NOT NULL, "entity" character varying NOT NULL, "action" character varying NOT NULL, "new_value" jsonb NOT NULL, "modified_at" TIMESTAMP WITH TIME ZONE NOT NULL, CONSTRAINT "PK_9cd5e794b800f501f89c8b8efbf" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "league"."person_role_enum" AS ENUM('captain', 'coach', 'defender', 'striker', 'keeper', 'midfielder', 'manager', 'trainer', 'agent', 'nutritionist', 'therapist', 'referee')`);
        await queryRunner.query(`CREATE TYPE "league"."person_status_enum" AS ENUM('active', 'inactive', 'suspended')`);
        await queryRunner.query(`CREATE TABLE "league"."person" ("id" uuid NOT NULL, "name" character varying NOT NULL, "last_name" character varying NOT NULL, "phone" character varying NOT NULL, "email" character varying NOT NULL, "dob" date NOT NULL, "role" "league"."person_role_enum" NOT NULL, "status" "league"."person_status_enum" NOT NULL DEFAULT 'active', "balance" integer DEFAULT '0', "team_id" uuid, "stats" jsonb DEFAULT '{"shotsOnGoal":0}', "wage" integer DEFAULT '0', "hire_date" TIMESTAMP, "type" character varying NOT NULL, CONSTRAINT "UQ_f1afee83e7625c5feb76dd574c2" UNIQUE ("email"), CONSTRAINT "PK_28d502b7fa8639086d924aab843" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_1f98f73c4b52d52a75b82096de" ON "league"."person" ("type") `);
        await queryRunner.query(`CREATE TYPE "league"."team_status_enum" AS ENUM('active', 'inactive')`);
        await queryRunner.query(`CREATE TABLE "league"."team" ("id" uuid NOT NULL, "name" character varying NOT NULL, "coach" uuid NOT NULL, "captain" uuid, "status" "league"."team_status_enum" NOT NULL DEFAULT 'inactive', CONSTRAINT "UQ_a0018d2d94d86ef05d858d032f1" UNIQUE ("name"), CONSTRAINT "REL_229a6f75d8d2f13a73936ea2d8" UNIQUE ("coach"), CONSTRAINT "REL_b060b9954ab36b76cb5d23a290" UNIQUE ("captain"), CONSTRAINT "PK_814bf8fc899e0b812d811d3d2ea" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "league"."match_location_enum" AS ENUM('spain', 'paris', 'italy', 'brazil', 'japan', 'korea')`);
        await queryRunner.query(`CREATE TABLE "league"."match" ("id" uuid NOT NULL, "home" uuid NOT NULL, "away" uuid NOT NULL, "home_score" integer NOT NULL, "away_score" integer NOT NULL, "played" TIMESTAMP NOT NULL, "location" "league"."match_location_enum" NOT NULL, "referee" uuid NOT NULL, CONSTRAINT "REL_b6ce3099bfa33b5ac8ff660c99" UNIQUE ("referee"), CONSTRAINT "PK_f8795ba326176079bfda42ffbb4" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "league"."person" ADD CONSTRAINT "FK_e6fcff0f5d3c939a36c71e9e420" FOREIGN KEY ("team_id") REFERENCES "league"."team"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "league"."team" ADD CONSTRAINT "FK_229a6f75d8d2f13a73936ea2d89" FOREIGN KEY ("coach") REFERENCES "league"."person"("id") ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "league"."team" ADD CONSTRAINT "FK_b060b9954ab36b76cb5d23a290b" FOREIGN KEY ("captain") REFERENCES "league"."person"("id") ON DELETE NO ACTION ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "league"."match" ADD CONSTRAINT "FK_3d22c730699b987b1bd187a9140" FOREIGN KEY ("home") REFERENCES "league"."team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "league"."match" ADD CONSTRAINT "FK_493731f98732f18ce01040d080c" FOREIGN KEY ("away") REFERENCES "league"."team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "league"."match" ADD CONSTRAINT "FK_b6ce3099bfa33b5ac8ff660c99d" FOREIGN KEY ("referee") REFERENCES "league"."person"("id") ON DELETE NO ACTION ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "league"."match" DROP CONSTRAINT "FK_b6ce3099bfa33b5ac8ff660c99d"`);
        await queryRunner.query(`ALTER TABLE "league"."match" DROP CONSTRAINT "FK_493731f98732f18ce01040d080c"`);
        await queryRunner.query(`ALTER TABLE "league"."match" DROP CONSTRAINT "FK_3d22c730699b987b1bd187a9140"`);
        await queryRunner.query(`ALTER TABLE "league"."team" DROP CONSTRAINT "FK_b060b9954ab36b76cb5d23a290b"`);
        await queryRunner.query(`ALTER TABLE "league"."team" DROP CONSTRAINT "FK_229a6f75d8d2f13a73936ea2d89"`);
        await queryRunner.query(`ALTER TABLE "league"."person" DROP CONSTRAINT "FK_e6fcff0f5d3c939a36c71e9e420"`);
        await queryRunner.query(`DROP TABLE "league"."match"`);
        await queryRunner.query(`DROP TYPE "league"."match_location_enum"`);
        await queryRunner.query(`DROP TABLE "league"."team"`);
        await queryRunner.query(`DROP TYPE "league"."team_status_enum"`);
        await queryRunner.query(`DROP INDEX "league"."IDX_1f98f73c4b52d52a75b82096de"`);
        await queryRunner.query(`DROP TABLE "league"."person"`);
        await queryRunner.query(`DROP TYPE "league"."person_status_enum"`);
        await queryRunner.query(`DROP TYPE "league"."person_role_enum"`);
        await queryRunner.query(`DROP TABLE "league"."audit"`);
    }

}

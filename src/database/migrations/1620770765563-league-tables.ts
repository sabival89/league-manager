import {MigrationInterface, QueryRunner} from "typeorm";

export class leagueTables1620770765563 implements MigrationInterface {
    name = 'leagueTables1620770765563'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "league"."person" DROP CONSTRAINT "FK_e6fcff0f5d3c939a36c71e9e420"`);
        await queryRunner.query(`ALTER TABLE "league"."person" ADD "age" integer NOT NULL`);
        await queryRunner.query(`ALTER TABLE "league"."person" ALTER COLUMN "stats" SET DEFAULT '{"shotsOnGoal":0}'`);
        await queryRunner.query(`ALTER TABLE "league"."person" ADD CONSTRAINT "FK_e6fcff0f5d3c939a36c71e9e420" FOREIGN KEY ("team_id") REFERENCES "league"."team"("id") ON DELETE SET NULL ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "league"."person" DROP CONSTRAINT "FK_e6fcff0f5d3c939a36c71e9e420"`);
        await queryRunner.query(`ALTER TABLE "league"."person" ALTER COLUMN "stats" SET DEFAULT '{"shotsOnGoal": 0}'`);
        await queryRunner.query(`ALTER TABLE "league"."person" DROP COLUMN "age"`);
        await queryRunner.query(`ALTER TABLE "league"."person" ADD CONSTRAINT "FK_e6fcff0f5d3c939a36c71e9e420" FOREIGN KEY ("team_id") REFERENCES "league"."team"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}

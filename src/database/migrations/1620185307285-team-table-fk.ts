import { MigrationInterface, QueryRunner } from 'typeorm';

export class teamTableFk1620185307285 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "league"."team" ADD CONSTRAINT "FK_0aec015057a54720c2b74c9a4d3" FOREIGN KEY ("coach") REFERENCES "league"."member"("id") ON DELETE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "league"."team" ADD CONSTRAINT "FK_0aec015057a54720c2b74c9a4d5e2" FOREIGN KEY ("captain") REFERENCES "league"."member"("id") ON DELETE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "league"."team" DROP CONSTRAINT "FK_0aec015057a54720c2b74c9a4d3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "league"."team" DROP CONSTRAINT "FK_0aec015057a54720c2b74c9a4d5e2"`,
    );
  }
}

import { MigrationInterface, QueryRunner } from 'typeorm';

export class matchTableFk1620185417044 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "league"."match" ADD CONSTRAINT "FK_827953500cba98b16d7778d05d4" FOREIGN KEY ("home") REFERENCES "league"."team"("id") ON DELETE CASCADE`,
    );

    await queryRunner.query(
      `ALTER TABLE "league"."match" ADD CONSTRAINT "FK_827953500cba98b16d7778e82a8" FOREIGN KEY ("team") REFERENCES "league"."team"("id") ON DELETE CASCADE`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "league"."match" DROP CONSTRAINT "FK_827953500cba98b16d7778d05d4"`,
    );
    await queryRunner.query(
      `ALTER TABLE "league"."match" DROP CONSTRAINT "FK_827953500cba98b16d7778e82a8"`,
    );
  }
}

import { MigrationInterface, QueryRunner } from 'typeorm';

export class memberTableFk1620183886542 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "league"."member" ADD CONSTRAINT "FK_969993b0f489ba93ebe1c6ec4a2" FOREIGN KEY ("person_id") REFERENCES "league"."person"("id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "league"."member" ADD CONSTRAINT "FK_968883b0f489ba93ecf1c6ec4a2" FOREIGN KEY ("team_id") REFERENCES "league"."team"("id")`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "league"."member" DROP CONSTRAINT "FK_969993b0f489ba93ebe1c6ec4a2"`,
    );

    await queryRunner.query(
      `ALTER TABLE "league"."member" DROP CONSTRAINT "FK_968883b0f489ba93ecf1c6ec4a2"`,
    );
  }
}

import { MigrationInterface, QueryRunner } from 'typeorm';

export class personTable1620147769158 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "league"."person" (
        "id" uuid NOT NULL PRIMARY KEY, 
        "name" VARCHAR ( 50 )  NOT NULL, 
        "last_name" VARCHAR ( 50 ) NOT NULL, 
        "phone" VARCHAR NOT NULL,
        "email" VARCHAR ( 255 ) UNIQUE NOT NULL, 
        "dob" date NOT NULL)`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "person"`);
  }
}

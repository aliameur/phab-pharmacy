import { MigrationInterface, QueryRunner } from 'typeorm';

export class Testimonial1705211238429 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "testimonial"
      (
        "id"          varchar PRIMARY KEY NOT NULL,
        "name"        character varying   NOT NULL,
        "testimonial" text                NOT NULL,
        "imageSrc"    character varying   NOT NULL,
        "created_at"  TIMESTAMP           NOT NULL DEFAULT now(),
        "updated_at"  TIMESTAMP           NOT NULL DEFAULT now()
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      DROP TABLE "testimonial"
    `);
  }
}

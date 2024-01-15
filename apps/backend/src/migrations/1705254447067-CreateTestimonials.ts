import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTestimonials1705254447067 implements MigrationInterface {
    name = 'CreateTestimonials1705254447067'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "testimonial" (
                "id" character varying NOT NULL,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "name" character varying NOT NULL,
                "testimonial" text NOT NULL,
                "imageSrc" character varying NOT NULL,
                CONSTRAINT "PK_e1aee1c726db2d336480c69f7cb" PRIMARY KEY ("id")
            )
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            DROP TABLE "testimonial"
        `);
    }

}

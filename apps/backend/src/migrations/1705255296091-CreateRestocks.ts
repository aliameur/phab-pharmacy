import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateRestocks1705255296091 implements MigrationInterface {
    name = 'CreateRestocks1705255296091'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            CREATE TABLE "restock_order_detail" (
                "id" character varying NOT NULL,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "product_id" integer NOT NULL,
                "quantity" integer NOT NULL,
                "order_id" character varying,
                CONSTRAINT "PK_505f0d832bc8070c18d71e94500" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            CREATE TYPE "public"."restock_order_status_enum" AS ENUM('PENDING', 'DELIVERED')
        `);
        await queryRunner.query(`
            CREATE TABLE "restock_order" (
                "id" character varying NOT NULL,
                "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
                "order_time" TIMESTAMP WITH TIME ZONE NOT NULL,
                "status" "public"."restock_order_status_enum" NOT NULL,
                "total_amount" numeric(10, 2) NOT NULL,
                CONSTRAINT "PK_d112c5d33da5a40f36a9ab5420d" PRIMARY KEY ("id")
            )
        `);
        await queryRunner.query(`
            ALTER TABLE "restock_order_detail"
            ADD CONSTRAINT "FK_c730b31903b767638b28044c88a" FOREIGN KEY ("order_id") REFERENCES "restock_order"("id") ON DELETE NO ACTION ON UPDATE NO ACTION
        `);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`
            ALTER TABLE "restock_order_detail" DROP CONSTRAINT "FK_c730b31903b767638b28044c88a"
        `);
        await queryRunner.query(`
            DROP TABLE "restock_order"
        `);
        await queryRunner.query(`
            DROP TYPE "public"."restock_order_status_enum"
        `);
        await queryRunner.query(`
            DROP TABLE "restock_order_detail"
        `);
    }

}

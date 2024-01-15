import { MigrationInterface, QueryRunner } from "typeorm";

export class RemoveOrderTime1705283908964 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "restock_order"
        DROP COLUMN "order_time"
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "restock_order"
        ADD "order_time" TIMESTAMP WITH TIME ZONE NOT NULL
    `);
  }

}

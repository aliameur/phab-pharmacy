import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddWholesalerOrderIdToRestockOrders1705280358393
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "restock_order"
        ADD "wholesaler_order_id" int
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "restock_order"
        DROP COLUMN "wholesaler_order_id"
    `);
  }
}

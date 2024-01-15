import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddProductIdAndMaxQuantity1705256397172
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product"
        ADD "wholesaler_product_id" int NULL`,
    );
    await queryRunner.query(
      `ALTER TABLE "product"
        ADD CONSTRAINT "UQ_wholesaler_product_id" UNIQUE ("wholesaler_product_id")`,
    );
    await queryRunner.query(
      `ALTER TABLE "product"
        ADD "max_quantity" int NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "product"
        DROP CONSTRAINT "UQ_wholesaler_product_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product"
        DROP COLUMN "wholesaler_product_id"`,
    );
    await queryRunner.query(
      `ALTER TABLE "product"
        DROP COLUMN "max_quantity"`,
    );
  }
}

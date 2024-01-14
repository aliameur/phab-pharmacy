import { Product as MedusaProduct } from '@medusajs/medusa';
import { Column, Entity } from 'typeorm';

@Entity()
export class Product extends MedusaProduct {
  @Column({ type: 'int', unique: true, nullable: true })
  wholesaler_product_id: number | null;

  @Column({ type: 'int', nullable: true })
  max_quantity: number | null;
}

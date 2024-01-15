import { BaseEntity } from '@medusajs/medusa';
import { generateEntityId } from '@medusajs/medusa/dist/utils';
import { BeforeInsert, Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { RestockOrder } from './restock-order';

@Entity()
export class RestockOrderDetail extends BaseEntity {
  @BeforeInsert()
  private beforeInsert(): void {
    this.id = generateEntityId(this.id, 'restock_order_detail');
  }

  @Column()
  product_id: number;

  @Column()
  quantity: number;

  @ManyToOne(() => RestockOrder, (order) => order.order_details)
  @JoinColumn({ name: 'order_id' })
  order: RestockOrder;
}

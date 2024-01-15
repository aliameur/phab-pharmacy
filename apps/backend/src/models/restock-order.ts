import { BaseEntity } from '@medusajs/medusa';
import { generateEntityId } from '@medusajs/medusa/dist/utils';
import { BeforeInsert, Column, Entity, OneToMany } from 'typeorm';

import { RestockOrderDetail } from './restock-order-detail';

export enum OrderStatus {
  PENDING = 'PENDING',
  DELIVERED = 'DELIVERED',
}

@Entity()
export class RestockOrder extends BaseEntity {
  @BeforeInsert()
  private beforeInsert(): void {
    this.id = generateEntityId(this.id, 'restock_order');
  }

  @Column({ type: 'int' })
  wholesaler_order_id: number;

  @Column({
    type: 'enum',
    enum: OrderStatus,
  })
  status: OrderStatus;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  total_amount: number;

  @OneToMany(() => RestockOrderDetail, (orderDetail) => orderDetail.order)
  order_details: RestockOrderDetail[];
}

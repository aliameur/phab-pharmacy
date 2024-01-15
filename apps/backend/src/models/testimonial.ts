import { BaseEntity } from '@medusajs/medusa';
import { generateEntityId } from '@medusajs/medusa/dist/utils';
import { BeforeInsert, Column, Entity } from 'typeorm';

@Entity()
export class Testimonial extends BaseEntity {
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'text' })
  testimonial: string;

  @Column({ type: 'varchar' })
  imageSrc: string;

  @BeforeInsert()
  private beforeInsert(): void {
    this.id = generateEntityId(this.id, 'testimonial');
  }
}

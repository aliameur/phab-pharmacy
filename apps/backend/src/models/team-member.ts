import { BaseEntity } from '@medusajs/medusa';
import { generateEntityId } from '@medusajs/medusa/dist/utils';
import { BeforeInsert, Column, Entity } from 'typeorm';

@Entity()
export class TeamMember extends BaseEntity {
  @Column({ type: 'varchar' })
  name: string;

  @Column({ type: 'varchar' })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'varchar' })
  imageSrc: string;

  @BeforeInsert()
  private beforeInsert(): void {
    this.id = generateEntityId(this.id, 'team_member');
  }
}

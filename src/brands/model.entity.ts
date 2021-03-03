import { Brand } from './brand.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Listing } from 'src/listings/listing.entity';

@Entity()
export class Model extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(
    type => Brand,
    brand => brand.models,
    { eager: false },
  )
  brand: Brand;

  @OneToMany(
    type => Listing,
    listing => listing.model,
    { eager: true },
  )
  listings: Listing[];
}

import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { FuelType as Type } from './enums/fuel-type.enum';
import { Listing } from './listing.entity';

@Entity()
export class FuelType extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  type: Type;

  @OneToMany(
    type => Listing,
    listing => listing.fuel,
    { eager: true },
  )
  listings: Listing[];
}

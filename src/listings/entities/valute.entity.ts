import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Listing } from '../listing.entity';

@Entity()
export class Valute extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  symbol: string;

  @OneToMany(
    type => Listing,
    listing => listing.valute,
    { eager: true },
  )
  listings: Listing[];
}

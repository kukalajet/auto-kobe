import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Transmission as Type } from '../enums/transmission.enum';
import { Listing } from '../listing.entity';

@Entity()
export class Transmission extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  type: Type;

  @OneToMany(
    type => Listing,
    listing => listing.transmission,
    { eager: true },
  )
  listings: Listing[];
}

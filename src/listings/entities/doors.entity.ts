import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DoorsType as Type } from '../enums/doors-type.enum';
import { Listing } from '../listing.entity';

@Entity()
export class DoorType extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  number: Type;

  @OneToMany(
    type => Listing,
    listing => listing.doors,
    { eager: true },
  )
  listings: Listing[];
}

import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { EmissionClass as Type } from '../enums/emission-class.enum';
import { Listing } from '../listing.entity';

@Entity()
export class EmissionClass extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  standard: Type;

  @OneToMany(
    type => Listing,
    listing => listing.emissionClass,
    { eager: true },
  )
  listings: Listing[];
}

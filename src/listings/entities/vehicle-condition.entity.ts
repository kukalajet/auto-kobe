import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { VehicleConditionType as Type } from '../enums/vehicle-condition.enum';
import { Listing } from '../listing.entity';

@Entity()
export class VehicleCondition extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  // @Column({
  //   type: 'enum',
  //   enum: Type,
  //   default: Type.Good,
  // })
  @Column('text')
  type: Type;

  @OneToMany(
    type => Listing,
    listing => listing.condition,
    { eager: true },
  )
  listings: Listing[];
}

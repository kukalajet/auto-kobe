import { User } from '../users/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ListingStatus } from './listing-status.enum';
import { EmissionClass } from './entities/emission-class.entity';
import { FuelType } from './entities/fuel-type.entity';
import { DoorType } from './entities/doors.entity';
import { Transmission } from './entities/transmission.entity';
import { VehicleCondition } from './entities/vehicle-condition.entity';
import { Model } from 'src/brands/model.entity';
import { Country } from './entities/country.entity';
import { Valute } from './entities/valute.entity';

@Entity()
export class Listing extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    type => Model,
    model => model.listings,
    { eager: false },
  )
  model: Model;

  @Column()
  registration: number;

  @ManyToOne(
    type => VehicleCondition,
    condition => condition.listings,
    { eager: false },
  )
  condition: VehicleCondition;

  @ManyToOne(
    type => Valute,
    valute => valute.listings,
    { eager: false },
  )
  // valute: Price;
  valute: Valute;

  @Column()
  price: number;

  @Column()
  mileage: number;

  @ManyToOne(
    type => Transmission,
    transmission => transmission.listings,
    { eager: false },
  )
  transmission: Transmission;

  @ManyToOne(
    type => Country,
    country => country.listings,
    { eager: false },
  )
  country: Country;

  @ManyToOne(
    type => DoorType,
    type => type.listings,
    { eager: false },
  )
  doors: DoorType;

  @Column()
  cubicCapacity: number;

  @ManyToOne(
    type => FuelType,
    type => type.listings,
    { eager: false },
  )
  fuel: FuelType;

  @ManyToOne(
    type => EmissionClass,
    emission => emission.listings,
    { eager: false },
  )
  emissionClass: EmissionClass;

  @Column()
  power: number;

  @Column()
  status: ListingStatus;

  @ManyToOne(
    type => User,
    user => user.listings,
    { eager: false },
  )
  user: User;
}

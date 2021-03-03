import { ApiProperty } from '@nestjs/swagger';
import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Listing } from '../listing.entity';
import { Valute } from './valute.entity';

@Entity()
export class Price extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  value: number;

  @ApiProperty({ type: Valute })
  @OneToOne(() => Valute)
  valute: Valute;

  // @OneToMany(
  //   type => Listing,
  //   listing => listing.price,
  //   { eager: true },
  // )
  // listings: Listing[];
}

import { User } from '../auth/user.entity';
import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ListingStatus } from './listing-status.enum';

@Entity()
export class Listing extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  status: ListingStatus;

  @ManyToOne(
    type => User,
    user => user.listings,
    { eager: false },
  )
  user: User;

  @Column()
  userId: number;
}

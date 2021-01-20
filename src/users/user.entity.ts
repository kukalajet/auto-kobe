import {
  BaseEntity,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { Listing } from '../listings/listing.entity';

@Entity()
@Unique(['email', 'googleId'])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column({ nullable: true })
  googleId: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: true })
  photoUrl: string;

  @Column({ nullable: true })
  password: string;

  @Column({ nullable: true })
  salt: string;

  @OneToMany(
    type => Listing,
    listing => listing.user,
    { eager: true },
  )
  listings: Listing[];

  async validatePassword(password: string): Promise<boolean> {
    console.log(`password: ${password}`);
    console.log(`salt: ${this.salt}`);
    const hash = await bcrypt.hash(password, this.salt);
    return hash === this.password;
  }
}

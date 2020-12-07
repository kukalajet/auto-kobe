import { EntityRepository, Repository } from 'typeorm';
import { GoogleAuthCredentialsDto, AuthCredentialsDto } from '../auth/dto';
import { User } from './user.entity';
import * as bcrypt from 'bcryptjs';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
    const { email, password } = authCredentialsDto;

    const user = new User();
    user.email = email;
    user.googleIdToken = null;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);

    try {
      await user.save();
    } catch (error) {
      // duplicated unique field
      if (error.code === '23505') {
        throw new ConflictException('User already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async validatePassword(
    authCredentialsDto: AuthCredentialsDto,
  ): Promise<number> {
    const { email, password } = authCredentialsDto;
    const user = await this.findOne({ email });

    if (user && (await user.validatePassword(password))) {
      return user.id;
    }

    return null;
  }

  async validateGoogleIdToken(
    googleAuthCredentialsDto: GoogleAuthCredentialsDto,
  ): Promise<number> {
    const { idToken, name, email, photoUrl } = googleAuthCredentialsDto;
    let user = await this.findOne({ email });

    if (user) {
      if (user.googleIdToken === idToken) {
        return user.id;
      }
      throw new ConflictException('Given credentials are wrong');
    }

    const newUser = new User();
    newUser.email = email;
    newUser.name = name;
    newUser.googleIdToken = idToken;
    newUser.photoUrl = photoUrl;

    try {
      await newUser.save();
    } catch (error) {
      // duplicated unique field
      if (error.code === '23505') {
        throw new ConflictException('User already exists');
      } else {
        throw new InternalServerErrorException();
      }
    }

    user = await this.findOne({ email });
    return user.id;
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { typeOrmConfig } from './config/typeorm.config';
import { ListingsModule } from './listings/listings.module';
import { UsersModule } from './users/users.module';
import { BrandsModule } from './brands/brands.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    AuthModule,
    ListingsModule,
    UsersModule,
    BrandsModule,
  ],
})
export class AppModule {}

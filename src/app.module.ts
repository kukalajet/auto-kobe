import { Logger, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { typeOrmConfig } from './config/typeorm.config';
import { ListingsModule } from './listings/listings.module';

@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), AuthModule, ListingsModule],
})
export class AppModule {}

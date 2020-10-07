import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { BrandRepository } from './brand.repository';
import { BrandsController } from './brands.controller';
import { BrandsService } from './brands.service';
import { ModelRepository } from './model.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([BrandRepository]),
    TypeOrmModule.forFeature([ModelRepository]),
    AuthModule,
  ],
  controllers: [BrandsController],
  providers: [BrandsService],
})
export class BrandsModule {}

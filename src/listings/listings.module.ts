import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from '../auth/auth.module';
import { DoorTypeRepository } from './repositories/door-type.repository';
import { ListingRepository } from './repositories/listing.repository';
import { ListingsController } from './listings.controller';
import { ListingsService } from './listings.service';
import { EmissionClassRepository } from './repositories/emission-class.repository';
import { FuelTypeRepository } from './repositories/fuel-type.repository';
import { TransmissionRepository } from './repositories/transmission.repository';
import { ValuteRepository } from './repositories/valute.repository';
import { ConditionRepository } from './repositories/condition.repository';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      ListingRepository,
      DoorTypeRepository,
      EmissionClassRepository,
      FuelTypeRepository,
      TransmissionRepository,
      ValuteRepository,
      ConditionRepository,
    ]),
    AuthModule,
  ],
  controllers: [ListingsController],
  providers: [ListingsService],
})
export class ListingsModule {}

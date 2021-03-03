import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString } from 'class-validator';
import { Brand } from '../../brands/brand.entity';
import { Model } from '../../brands/model.entity';
import { Price } from '../entities/price.entity';
import { Country } from '../entities/country.entity';
import { Transmission } from '../entities/transmission.entity';
import { VehicleCondition } from '../entities/vehicle-condition.entity';
import { DoorType } from '../entities/doors.entity';
import { FuelType } from '../entities/fuel-type.entity';
import { EmissionClass } from '../entities/emission-class.entity';
import { Valute } from '../entities/valute.entity';

export class CreateListingDto {
  @IsNotEmpty()
  @ApiProperty({ type: Brand })
  brand: string;

  @IsNotEmpty()
  @ApiProperty({ type: Model })
  model: string;

  @IsNotEmpty()
  @IsNumberString()
  registration: number;

  @IsNotEmpty()
  @ApiProperty({ type: VehicleCondition })
  condition: string;

  @IsNotEmpty()
  @ApiProperty({ type: Valute })
  valute: string;

  @IsNotEmpty()
  @IsNumberString()
  price: number;

  @IsNotEmpty()
  @IsNumberString()
  mileage: number;

  @IsNotEmpty()
  @ApiProperty({ type: Transmission })
  transmission: string;

  @IsNotEmpty()
  @ApiProperty({ type: Country })
  country: string;

  @IsNotEmpty()
  @ApiProperty({ type: DoorType })
  doors: string;

  @IsNumberString()
  cubicCapacity: number;

  @IsNotEmpty()
  @ApiProperty({ type: FuelType })
  fuel: string;

  @IsNotEmpty()
  @ApiProperty({ type: EmissionClass })
  emissionClass: string;

  @IsNotEmpty()
  @IsNumberString()
  power: number;
}

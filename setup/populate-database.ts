import { Brand } from '../src/brands/brand.entity';
import { Model } from '../src/brands/model.entity';
import { Transmission } from '../src/listings/entities/transmission.entity';
import { Valute } from '../src/listings/entities/valute.entity';
import { VehicleCondition } from '../src/listings/entities/vehicle-condition.entity';
import { VehicleConditionType } from '../src/listings/enums/vehicle-condition.enum';
import { Transmission as TransmissionType } from '../src/listings/enums/transmission.enum';
import { Country } from '../src/listings/entities/country.entity';
import { DoorType } from '../src/listings/entities/doors.entity';
import { DoorsType } from '../src/listings/enums/doors-type.enum';
import { FuelType as Fuel } from '../src/listings/entities/fuel-type.entity';
import { FuelType } from '../src/listings/enums/fuel-type.enum';
import { EmissionClass } from '../src/listings/entities/emission-class.entity';
import { EmissionClass as EmissionClassType } from '../src/listings/enums/emission-class.enum';

// default data
import {
  valutes,
  countries,
  emissionClasses,
  doorSetups,
  fuelTypes,
  transmissions,
  conditions,
  brands,
  models,
} from './data';

export async function populate() {
  valutes.forEach(async item => {
    const valute = new Valute();
    valute.name = item.name;
    valute.symbol = item.symbol;
    await valute.save();
  });

  countries.forEach(async item => {
    const country = new Country();
    country.name = item.name;
    country.image = item.image;
    await country.save();
  });

  emissionClasses.forEach(async item => {
    const emission = new EmissionClass();
    emission.standard = EmissionClassType[item.standard];
    await emission.save();
  });

  doorSetups.forEach(async item => {
    const doorSetup = new DoorType();
    doorSetup.number = DoorsType[item.number];
    await doorSetup.save();
  });

  fuelTypes.forEach(async item => {
    const fuelType = new Fuel();
    fuelType.type = FuelType[item.type];
    console.log(`fuelType.type: ${fuelType.type}`);
    await fuelType.save();
  });

  transmissions.forEach(async item => {
    const transmission = new Transmission();
    transmission.type = TransmissionType[item.type];
    console.log(`transmission.type: ${transmission.type}`);
    await transmission.save();
  });

  conditions.forEach(async item => {
    const condition = new VehicleCondition();
    condition.type = VehicleConditionType[item.name];
    console.log(`condition.type: ${condition.type}`);
    await condition.save();
  });

  brands.forEach(async item => {
    const brand = new Brand();
    brand.name = item.name;
    await brand.save();

    models.forEach(async type => {
      const model = new Model();
      model.name = type.name;
      model.brand = brand;
      await model.save();
    });
  });
}

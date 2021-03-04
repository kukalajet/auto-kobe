import { Brand } from '../../brands/brand.entity';
import { Model } from '../../brands/model.entity';
import { Transmission } from '../transmission.entity';
import { Valute } from '../valute.entity';
import { VehicleCondition } from '../vehicle-condition.entity';
import { VehicleConditionType } from '../enums/vehicle-condition.enum';
import { Transmission as TransmissionType } from '../enums/transmission.enum';
import { Country } from '../country.entity';
import { DoorType } from '../doors.entity';
import { DoorsType } from '../enums/doors-type.enum';
import { FuelType as Fuel } from '../fuel-type.entity';
import { FuelType } from '../enums/fuel-type.enum';
import { EmissionClass } from '../emission-class.entity';
import { EmissionClass as EmissionClassType } from '../enums/emission-class.enum';

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

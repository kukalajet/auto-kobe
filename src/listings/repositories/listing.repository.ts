import { InternalServerErrorException, Logger } from '@nestjs/common';
import { User } from '../../users/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateListingDto } from '../dto/create-listing.dto';
import { GetListingsFilterDto } from '../dto/get-listings-filter.dto';
import { ListingStatus } from '../listing-status.enum';
import { Listing } from '../listing.entity';
import { Brand } from '../../brands/brand.entity';
import { Model } from '../../brands/model.entity';
import { EmissionClass } from '../emission-class.entity';
import { VehicleCondition } from '../vehicle-condition.entity';
import { Valute } from '../valute.entity';
import { Transmission } from '../transmission.entity';
import { Country } from '../country.entity';
import { DoorType } from '../doors.entity';
import { FuelType } from '../fuel-type.entity';

@EntityRepository(Listing)
export class ListingRepository extends Repository<Listing> {
  private logger = new Logger('ListingRepository');

  async getListings(
    filterDto: GetListingsFilterDto,
    user: User,
  ): Promise<Listing[]> {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder('listing');

    query.where('listing.user = :userId', { userId: user.id });

    query.leftJoinAndSelect('listing.model', 'model');
    query.leftJoinAndSelect('listing.condition', 'vehicle_condition');
    query.leftJoinAndSelect('listing.valute', 'valute');
    query.leftJoinAndSelect('listing.transmission', 'transmission');
    query.leftJoinAndSelect('listing.country', 'country');
    query.leftJoinAndSelect('listing.doors', 'door_type');
    query.leftJoinAndSelect('listing.fuel', 'fuel_type');
    query.leftJoinAndSelect('listing.emissionClass', 'emission_class');

    if (status) {
      query.andWhere('listing.status = :status', { status });
    }

    if (search) {
      query.andWhere(
        '(listing.title LIKE :search OR listing.description LIKE :search)',
        { search: `%${search}%` },
      );
    }

    try {
      const listings = await query.getMany();
      return listings;
    } catch (error) {
      this.logger.error(
        `Failed to get listings for user "${
          user.id
        }". Filters: ${JSON.stringify(filterDto)}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }

  async createListing(
    createListingDto: CreateListingDto,
    user: User,
  ): Promise<Listing> {
    const {
      brand,
      model,
      registration,
      condition,
      valute,
      price,
      mileage,
      transmission,
      country,
      doors,
      cubicCapacity,
      fuel,
      emissionClass,
      power,
    } = createListingDto;
    const listing = new Listing();

    listing.model = await Model.findOne(JSON.parse(model).id);
    listing.registration = registration;
    listing.condition = await VehicleCondition.findOne(
      JSON.parse(condition).id,
    );
    listing.price = price;
    listing.valute = await Valute.findOne(JSON.parse(valute).id);
    listing.mileage = mileage;
    listing.transmission = await Transmission.findOne(
      JSON.parse(transmission).id,
    );
    listing.country = await Country.findOne(JSON.parse(country).id);
    listing.doors = await DoorType.findOne(JSON.parse(doors).id);
    listing.cubicCapacity = cubicCapacity;
    listing.fuel = await FuelType.findOne(JSON.parse(fuel).id);
    listing.emissionClass = await EmissionClass.findOne(
      JSON.parse(emissionClass).id,
    );
    listing.power = power;
    listing.status = ListingStatus.AVAILABLE;
    listing.user = user;

    try {
      await listing.save();
    } catch (error) {
      this.logger.log(
        `Failed to create a listing for user "${user.id}". Data: ${createListingDto}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }

    delete listing.user;
    return listing;
  }
}

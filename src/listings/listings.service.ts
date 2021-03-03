import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { DoorTypeRepository } from './repositories/door-type.repository';
import { CreateListingDto } from './dto/create-listing.dto';
import { GetDoorTypesFilterDto } from './dto/get-door-types-filter-dto';
import { GetListingsFilterDto } from './dto/get-listings-filter.dto';
import { DoorType } from './entities/doors.entity';
import { ListingStatus } from './listing-status.enum';
import { Listing } from './listing.entity';
import { ListingRepository } from './repositories/listing.repository';
import { GetEmissionClassesFilterDto } from './dto/get-emission-classes-filter-dto';
import { EmissionClass } from './entities/emission-class.entity';
import { EmissionClassRepository } from './repositories/emission-class.repository';
import { FuelTypeRepository } from './repositories/fuel-type.repository';
import { FuelType } from './entities/fuel-type.entity';
import { GetFuelTypeFilterDto } from './dto/get-fuel-types-filter.dto';
import { TransmissionRepository } from './repositories/transmission.repository';
import { GetTransmissionFilterDto } from './dto/get-transmissions-filter.dto';
import { Transmission } from './entities/transmission.entity';
import { ValuteRepository } from './repositories/valute.repository';
import { GetValuteFilterDto } from './dto/get-valute-filter.dto';
import { Valute } from './entities/valute.entity';
import { VehicleCondition } from './entities/vehicle-condition.entity';
import { GetConditionFilterDto } from './dto/get-condition-filter.dto';
import { ConditionRepository } from './repositories/condition.repository';

@Injectable()
export class ListingsService {
  constructor(
    @InjectRepository(ListingRepository)
    private listingRepository: ListingRepository,
    @InjectRepository(DoorTypeRepository)
    private doorTypeRepository: DoorTypeRepository,
    @InjectRepository(EmissionClassRepository)
    private emissionClassRepository: EmissionClassRepository,
    @InjectRepository(FuelTypeRepository)
    private fuelTypeRepository: FuelTypeRepository,
    @InjectRepository(TransmissionRepository)
    private transmissionRepository: TransmissionRepository,
    @InjectRepository(ValuteRepository)
    private valuteRepository: ValuteRepository,
    @InjectRepository(ConditionRepository)
    private conditionRepository: ConditionRepository,
  ) {}

  async getListings(
    filterDto: GetListingsFilterDto,
    user: User,
  ): Promise<Listing[]> {
    return this.listingRepository.getListings(filterDto, user);
  }

  async getListingById(id: number, user: User): Promise<Listing> {
    const found = await this.listingRepository.findOne({
      where: { id, userId: user.id },
    });

    if (!found) {
      throw new NotFoundException(`Listing with ID "${id}" not found`);
    }

    return found;
  }

  async createListing(
    createListingDto: CreateListingDto,
    user: User,
  ): Promise<Listing> {
    return this.listingRepository.createListing(createListingDto, user);
  }

  async deleteListing(id: number, user: User): Promise<void> {
    // const result = await this.listingRepository.delete({ id, userId: user.id });
    // if (result.affected === 0) {
    //   throw new NotFoundException(`Listing with ID "${id}" not found`);
    // }
  }

  async updateListingStatus(
    id: number,
    status: ListingStatus,
    user: User,
  ): Promise<Listing> {
    const listing = await this.getListingById(id, user);
    listing.status = status;
    await listing.save();
    return listing;
  }

  async getDoorTypes(filterDto: GetDoorTypesFilterDto): Promise<DoorType[]> {
    return this.doorTypeRepository.getDoorTypes(filterDto);
  }

  async getEmissionClasses(
    filterDto: GetEmissionClassesFilterDto,
  ): Promise<EmissionClass[]> {
    return this.emissionClassRepository.getEmissionClasses(filterDto);
  }

  async getFuelTypes(filterDto: GetFuelTypeFilterDto): Promise<FuelType[]> {
    return this.fuelTypeRepository.getFuelTypes(filterDto);
  }

  async getTransmissions(
    filterDto: GetTransmissionFilterDto,
  ): Promise<Transmission[]> {
    return this.transmissionRepository.getTransmissions(filterDto);
  }

  async getValutes(filterDto: GetValuteFilterDto): Promise<Valute[]> {
    return this.valuteRepository.getValutes(filterDto);
  }

  async getConditions(
    filterDto: GetConditionFilterDto,
  ): Promise<VehicleCondition[]> {
    return this.conditionRepository.getConditions(filterDto);
  }
}

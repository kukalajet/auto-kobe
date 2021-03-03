import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Brand } from 'src/brands/brand.entity';
import { GetUser } from '../users/get-user.decorator';
import { User } from '../users/user.entity';
import { CreateListingDto } from './dto/create-listing.dto';
import { GetConditionFilterDto } from './dto/get-condition-filter.dto';
import { GetDoorTypesFilterDto } from './dto/get-door-types-filter-dto';
import { GetEmissionClassesFilterDto } from './dto/get-emission-classes-filter-dto';
import { GetFuelTypeFilterDto } from './dto/get-fuel-types-filter.dto';
import { GetListingsFilterDto } from './dto/get-listings-filter.dto';
import { GetTransmissionFilterDto } from './dto/get-transmissions-filter.dto';
import { GetValuteFilterDto } from './dto/get-valute-filter.dto';
import { DoorType } from './entities/doors.entity';
import { EmissionClass } from './entities/emission-class.entity';
import { FuelType } from './entities/fuel-type.entity';
import { Transmission } from './entities/transmission.entity';
import { Valute } from './entities/valute.entity';
import { VehicleCondition } from './entities/vehicle-condition.entity';
import { ListingStatus } from './listing-status.enum';
import { Listing } from './listing.entity';
import { ListingsService } from './listings.service';
import { ListingStatusValidationPipe } from './pipes/listing-status-validation.pipe';

@Controller('listings')
@UseGuards(AuthGuard())
export class ListingsController {
  private logger = new Logger('ListingsController');

  constructor(private listingsService: ListingsService) {}

  @Get()
  getListings(
    @Query(ValidationPipe) filterDto: GetListingsFilterDto,
    @GetUser() user: User,
  ): Promise<Listing[]> {
    this.logger.verbose(
      `User "${user.id}" retrieving all listings. Filters: ${JSON.stringify(
        filterDto,
      )}`,
    );
    return this.listingsService.getListings(filterDto, user);
  }

  @Get('/door-types')
  getDoorTypes(
    @Query(ValidationPipe) filterDto: GetDoorTypesFilterDto,
    @GetUser() user: User,
  ): Promise<DoorType[]> {
    this.logger.verbose(
      `User "${user.id}" retrieving all listings. Filters: ${JSON.stringify(
        filterDto,
      )}`,
    );
    return this.listingsService.getDoorTypes(filterDto);
  }

  @Get('/emission-classes')
  getEmissionClasses(
    @Query(ValidationPipe) filterDto: GetEmissionClassesFilterDto,
    @GetUser() user: User,
  ): Promise<EmissionClass[]> {
    this.logger.verbose(
      `User "${
        user.id
      }" retrieving all emission classes. Filters: ${JSON.stringify(
        filterDto,
      )}`,
    );
    return this.listingsService.getEmissionClasses(filterDto);
  }

  @Get('/fuel-types')
  getFuelTypes(
    @Query(ValidationPipe) filterDto: GetFuelTypeFilterDto,
    @GetUser() user: User,
  ): Promise<FuelType[]> {
    this.logger.verbose(
      `User "${
        user.id
      }" retrieving all emission classes. Filters: ${JSON.stringify(
        filterDto,
      )}`,
    );
    return this.listingsService.getFuelTypes(filterDto);
  }

  @Get('/transmissions')
  getTransmissions(
    @Query(ValidationPipe) filterDto: GetTransmissionFilterDto,
    @GetUser() user: User,
  ): Promise<Transmission[]> {
    this.logger.verbose(
      `User "${
        user.id
      }" retrieving all emission classes. Filters: ${JSON.stringify(
        filterDto,
      )}`,
    );
    return this.listingsService.getTransmissions(filterDto);
  }

  @Get('/valutes')
  getValutes(
    @Query(ValidationPipe) filterDto: GetValuteFilterDto,
    @GetUser() user: User,
  ): Promise<Valute[]> {
    this.logger.verbose(
      `User "${user.id}" retrieving all valutes. Filters: ${JSON.stringify(
        filterDto,
      )}`,
    );
    return this.listingsService.getValutes(filterDto);
  }

  @Get('/conditions')
  getConditions(
    @Query(ValidationPipe) filterDto: GetConditionFilterDto,
    @GetUser() user: User,
  ): Promise<VehicleCondition[]> {
    this.logger.verbose(
      `User "${user.id}" retrieving all conditions. Filters: ${JSON.stringify(
        filterDto,
      )}`,
    );
    return this.listingsService.getConditions(filterDto);
  }

  @Get('/:id')
  getListingById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<Listing> {
    return this.listingsService.getListingById(id, user);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createListing(
    @Body() createListingDto: CreateListingDto,
    @GetUser() user: User,
  ): Promise<Listing> {
    this.logger.verbose(
      `User "${user.id}" creating a new listing. Data: ${JSON.stringify(
        createListingDto,
      )}`,
    );
    return this.listingsService.createListing(createListingDto, user);
  }

  @Delete('/:id')
  deleteListing(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    return this.listingsService.deleteListing(id, user);
  }

  @Patch('/:id/status')
  updateListingStatus(
    @Param('id', ParseIntPipe) id: number,
    @Body('status', ListingStatusValidationPipe) status: ListingStatus,
    @GetUser() user: User,
  ): Promise<Listing> {
    return this.listingsService.updateListingStatus(id, status, user);
  }
}

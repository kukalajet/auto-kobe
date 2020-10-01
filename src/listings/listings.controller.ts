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
import { GetUser } from '../users/get-user.decorator';
import { User } from '../users/user.entity';
import { CreateListingDto } from './dto/create-listing.dto';
import { GetListingsFilterDto } from './dto/get-listings-filter.dto';
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
      `User "${
        user.username
      }" retrieving all listings. Filters: ${JSON.stringify(filterDto)}`,
    );
    return this.listingsService.getListings(filterDto, user);
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

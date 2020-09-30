import {
  Controller,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Query,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';
import { GetListingsFilterDto } from './dto/get-listings-filter.dto';
import { Listing } from './listing.entity';
import { ListingsService } from './listings.service';

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
}

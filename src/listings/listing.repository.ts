import { InternalServerErrorException, Logger } from '@nestjs/common';
import { User } from '../users/user.entity';
import { EntityRepository, Repository } from 'typeorm';
import { CreateListingDto } from './dto/create-listing.dto';
import { GetListingsFilterDto } from './dto/get-listings-filter.dto';
import { ListingStatus } from './listing-status.enum';
import { Listing } from './listing.entity';

@EntityRepository(Listing)
export class ListingRepository extends Repository<Listing> {
  private logger = new Logger('ListingRepository');

  async getListings(
    filterDto: GetListingsFilterDto,
    user: User,
  ): Promise<Listing[]> {
    const { status, search } = filterDto;
    const query = this.createQueryBuilder('listing');

    query.where('listing.userId = :userId', { userId: user.id });

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
    const { title, description } = createListingDto;

    const listing = new Listing();
    listing.title = title;
    listing.description = description;
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

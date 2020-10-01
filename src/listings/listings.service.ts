import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users/user.entity';
import { CreateListingDto } from './dto/create-listing.dto';
import { GetListingsFilterDto } from './dto/get-listings-filter.dto';
import { ListingStatus } from './listing-status.enum';
import { Listing } from './listing.entity';
import { ListingRepository } from './listing.repository';

@Injectable()
export class ListingsService {
  constructor(
    @InjectRepository(ListingRepository)
    private listingRepository: ListingRepository,
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
    const result = await this.listingRepository.delete({ id, userId: user.id });
    if (result.affected === 0) {
      throw new NotFoundException(`Listing with ID "${id}" not found`);
    }
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
}

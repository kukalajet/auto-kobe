import { IsIn, IsNotEmpty, IsOptional } from 'class-validator';
import { ListingStatus } from '../listing-status.enum';

export class GetListingsFilterDto {
  @IsOptional()
  @IsIn([ListingStatus.AVAILABLE, ListingStatus.SOLD, ListingStatus.DELETED])
  status: ListingStatus;

  @IsOptional()
  @IsNotEmpty()
  search: string;
}

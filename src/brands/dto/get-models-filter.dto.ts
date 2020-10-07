import { IsNumber } from 'class-validator';

export class GetModelsFilterDto {
  @IsNumber()
  brandId: number;
}

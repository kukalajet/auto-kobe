import { InternalServerErrorException, Logger } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Brand } from './brand.entity';
import { CreateBrandDto } from './dto/create-brand.dto';
import { GetBrandsFilterDto } from './dto/get-brands-filter.dto';

@EntityRepository(Brand)
export class BrandRepository extends Repository<Brand> {
  private logger = new Logger('BrandRepository');

  async getBrands(filterDto: GetBrandsFilterDto): Promise<Brand[]> {
    const {} = filterDto; // TODO: Add filters for brands.
    const query = this.createQueryBuilder('brands');

    try {
      const brands = await query.getMany();
      return brands;
    } catch (error) {
      this.logger.error(
        `Failed to get brands. Filters: ${JSON.stringify(filterDto)}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }

  async createBrand(createBrandDto: CreateBrandDto): Promise<Brand> {
    const { name } = createBrandDto;

    const brand = new Brand();
    brand.name = name;

    try {
      await brand.save();
    } catch (error) {
      this.logger.log(
        `Failed to create a brand for "${name}". Data: ${createBrandDto}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }

    return brand;
  }
}

import { InternalServerErrorException, Logger } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { GetFuelTypeFilterDto } from '../dto/get-fuel-types-filter.dto';
import { FuelType } from '../fuel-type.entity';

@EntityRepository(FuelType)
export class FuelTypeRepository extends Repository<FuelType> {
  private logger = new Logger('FuelTypeRepository');

  async getFuelTypes(filterDto: GetFuelTypeFilterDto): Promise<FuelType[]> {
    const {} = filterDto;
    const query = this.createQueryBuilder('fuel_type');

    try {
      const types = await query.getMany();
      return types;
    } catch (error) {
      this.logger.error(
        `Failed to get fuel types. Filters: ${JSON.stringify(filterDto)}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }
}

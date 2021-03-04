import { InternalServerErrorException, Logger } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { GetEmissionClassesFilterDto } from '../dto/get-emission-classes-filter-dto';
import { EmissionClass } from '../emission-class.entity';

@EntityRepository(EmissionClass)
export class EmissionClassRepository extends Repository<EmissionClass> {
  private logger = new Logger('EmissionClassRepository');

  async getEmissionClasses(
    filterDto: GetEmissionClassesFilterDto,
  ): Promise<EmissionClass[]> {
    const {} = filterDto;
    const query = this.createQueryBuilder('emission_class');

    try {
      const classes = await query.getMany();
      return classes;
    } catch (error) {
      this.logger.error(
        `Failed to get emission classes. Filters: ${JSON.stringify(filterDto)}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }
}

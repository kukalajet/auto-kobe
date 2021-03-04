import { InternalServerErrorException, Logger } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { GetConditionFilterDto } from '../dto/get-condition-filter.dto';
import { VehicleCondition } from '../vehicle-condition.entity';

@EntityRepository(VehicleCondition)
export class ConditionRepository extends Repository<VehicleCondition> {
  private logger = new Logger('DoorTypeRepository');

  async getConditions(
    filterDto: GetConditionFilterDto,
  ): Promise<VehicleCondition[]> {
    const {} = filterDto;
    const query = this.createQueryBuilder('vehicle_condition');

    try {
      const types = await query.getMany();
      return types;
    } catch (error) {
      this.logger.error(
        `Failed to get brands. Filters: ${JSON.stringify(filterDto)}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }
}

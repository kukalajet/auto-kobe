import { InternalServerErrorException, Logger } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { GetDoorTypesFilterDto } from '../dto/get-door-types-filter-dto';
import { DoorType } from '../entities/doors.entity';

@EntityRepository(DoorType)
export class DoorTypeRepository extends Repository<DoorType> {
  private logger = new Logger('DoorTypeRepository');

  async getDoorTypes(filterDto: GetDoorTypesFilterDto): Promise<DoorType[]> {
    const {} = filterDto;
    const query = this.createQueryBuilder('door_type');

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

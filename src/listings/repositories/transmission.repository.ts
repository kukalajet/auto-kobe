import { InternalServerErrorException, Logger } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { GetTransmissionFilterDto } from '../dto/get-transmissions-filter.dto';
import { Transmission } from '../transmission.entity';

@EntityRepository(Transmission)
export class TransmissionRepository extends Repository<Transmission> {
  private logger = new Logger('TransmissionRepository');

  async getTransmissions(
    filterDto: GetTransmissionFilterDto,
  ): Promise<Transmission[]> {
    const {} = filterDto;
    const query = this.createQueryBuilder('transmission');

    try {
      const transmissions = await query.getMany();
      return transmissions;
    } catch (error) {
      this.logger.error(
        `Failed to get transmissions. Filters: ${JSON.stringify(filterDto)}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }
}

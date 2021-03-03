import { InternalServerErrorException, Logger } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { GetTransmissionFilterDto } from '../dto/get-transmissions-filter.dto';
import { GetValuteFilterDto } from '../dto/get-valute-filter.dto';
import { Transmission } from '../entities/transmission.entity';
import { Valute } from '../entities/valute.entity';

@EntityRepository(Valute)
export class ValuteRepository extends Repository<Valute> {
  private logger = new Logger('ValuteRepository');

  async getValutes(filterDto: GetValuteFilterDto): Promise<Valute[]> {
    const {} = filterDto;
    const query = this.createQueryBuilder('valute');

    try {
      const valutes = await query.getMany();
      return valutes;
    } catch (error) {
      this.logger.error(
        `Failed to get transmissions. Filters: ${JSON.stringify(filterDto)}`,
        error.stack,
      );
      throw new InternalServerErrorException();
    }
  }
}

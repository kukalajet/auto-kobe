import { InternalServerErrorException, Logger } from '@nestjs/common';
import { EntityRepository, Repository } from 'typeorm';
import { Brand } from './brand.entity';
import { CreateBrandDto } from './dto/create-brand.dto';
import { CreateModelDto } from './dto/create-model.dto';
import { Model } from './model.entity';

@EntityRepository(Model)
export class ModelRepository extends Repository<Model> {
  private logger = new Logger('ModelRepository');

  async createModel(
    createModelDto: CreateModelDto,
    brand: Brand,
  ): Promise<Model> {
    const { name } = createModelDto;

    const model = new Model();
    model.name = name;
    model.brand = brand;

    try {
      await model.save();
    } catch (error) {
      this.logger.log(
        `Failed to create a model for brand "${brand.id}". Data: ${CreateBrandDto}`,
      );
      throw new InternalServerErrorException();
    }

    return model;
  }
}

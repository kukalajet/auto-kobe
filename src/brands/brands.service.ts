import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Brand } from './brand.entity';
import { BrandRepository } from './brand.repository';
import { CreateBrandDto } from './dto/create-brand.dto';
import { CreateModelDto } from './dto/create-model.dto';
import { GetBrandsFilterDto } from './dto/get-brands-filter.dto';
import { Model } from './model.entity';
import { ModelRepository } from './model.repository';

@Injectable()
export class BrandsService {
  constructor(
    @InjectRepository(BrandRepository)
    private brandRepository: BrandRepository,
    @InjectRepository(ModelRepository)
    private modelRepository: ModelRepository,
  ) {}

  async getBrands(filterDto: GetBrandsFilterDto): Promise<Brand[]> {
    return this.brandRepository.getBrands(filterDto);
  }

  async getBrandById(id: number): Promise<Brand> {
    const found = await this.brandRepository.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException(`Brand with ID "${id}" not found`);
    }

    return found;
  }

  async createBrand(createBrandDto: CreateBrandDto): Promise<Brand> {
    return this.brandRepository.createBrand(createBrandDto);
  }

  async deleteBrand(id: number): Promise<void> {
    const result = await this.brandRepository.delete({ id });
    if (result.affected === 0) {
      throw new NotFoundException(`Brand with ID "${id}" not found`);
    }
  }

  async getModels(idBrand: number): Promise<Model[]> {
    const found = await this.brandRepository.findOne({
      where: { id: idBrand },
    });

    if (!found) {
      throw new NotFoundException(
        `Brand with id "${idBrand}" not found. Cannot get models for this brand.`,
      );
    }

    found.models.forEach(model => delete model.listings);
    return found.models;
  }

  async getModelById(modelId: number, brandId: number): Promise<Model> {
    const foundBrand = await this.brandRepository.findOne({
      where: { id: brandId },
    });
    if (!foundBrand) {
      throw new NotFoundException(
        `Brand with id "${brandId}" not found. Cannot get model with id "${modelId}" for this brand.`,
      );
    }

    const model = foundBrand.models.find(item => item.id === modelId);
    if (!model) {
      throw new NotFoundException(
        `Model with id "${modelId}" not found in Brand with id "${brandId}".`,
      );
    }

    delete model.listings;
    return model;
  }

  async createModel(
    createBrandDto: CreateBrandDto,
    brandId: number,
  ): Promise<Model> {
    const foundBrand = await this.brandRepository.findOne({
      where: { id: brandId },
    });

    if (!foundBrand) {
      throw new NotFoundException(
        `Brand with id "${brandId}" not found. Cannot create model with this brand.`,
      );
    }

    return this.modelRepository.createModel(createBrandDto, foundBrand);
  }

  async deleteModel(modelId: number, brandId: number): Promise<void> {
    const foundBrand = await this.brandRepository.findOne({
      where: { id: brandId },
    });
    if (!foundBrand) {
      throw new NotFoundException(
        `Brand with id "${brandId}" not found. Cannot delete model with id "${modelId}" for this brand.`,
      );
    }

    const model = foundBrand.models.find(item => item.id === modelId);
    if (!model) {
      throw new NotFoundException(
        `Model with id "${modelId}" not found in Brand with id "${brandId}".`,
      );
    }

    const result = await this.modelRepository.delete({ id: modelId });
    if (result.affected === 0) {
      throw new NotFoundException(`Model with id "${modelId}" not found`);
    }
  }
}

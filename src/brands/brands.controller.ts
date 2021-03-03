import {
  Body,
  Controller,
  Delete,
  Get,
  Logger,
  Param,
  ParseIntPipe,
  Post,
  Query,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from '../users/get-user.decorator';
import { User } from '../users/user.entity';
import { Brand } from './brand.entity';
import { BrandsService } from './brands.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { CreateModelDto } from './dto/create-model.dto';
import { GetBrandsFilterDto } from './dto/get-brands-filter.dto';
import { GetModelsFilterDto } from './dto/get-models-filter.dto';
import { Model } from './model.entity';

@Controller('brands')
@UseGuards(AuthGuard())
export class BrandsController {
  private logger = new Logger('BrandsController');

  constructor(private brandsService: BrandsService) {}

  @Get()
  getBrands(
    @Query(ValidationPipe) filterDto: GetBrandsFilterDto,
    @GetUser() user: User,
  ): Promise<Brand[]> {
    this.logger.verbose(
      `User "${user.id} retrieving all brands. Filters: ${JSON.stringify(
        filterDto,
      )}`,
    );
    return this.brandsService.getBrands(filterDto);
  }

  @Get('/:id')
  getBrandById(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<Brand> {
    this.logger.verbose(`User "${user.id}" retrieving brand "${id}".`);
    return this.brandsService.getBrandById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  createBrand(
    @Body() createBrandDto: CreateBrandDto,
    @GetUser() user: User,
  ): Promise<Brand> {
    this.logger.verbose(
      `User "${user.id}" creating a new brand. Data: ${JSON.stringify(
        createBrandDto,
      )}`,
    );
    return this.brandsService.createBrand(createBrandDto);
  }

  @Delete('/:id')
  deleteBrand(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<void> {
    this.logger.verbose(`User "${user.id}" deleting a brand with id "${id}".}`);
    return this.brandsService.deleteBrand(id);
  }

  @Get('/:id/models')
  getModels(
    @Param('id', ParseIntPipe) id: number,
    @GetUser() user: User,
  ): Promise<Model[]> {
    this.logger.verbose(
      `User "${user.id}" retrieving all models for brand "${id}"`,
    );
    return this.brandsService.getModels(id);
  }

  @Get('/:brandId/models/:modelId')
  getModelById(
    @Param('brandId', ParseIntPipe) brandId: number,
    @Param('modelId', ParseIntPipe) modelId: number,
    @GetUser() user: User,
  ): Promise<Model> {
    this.logger.verbose(
      `User "${user.id}" retrieving model "${modelId}" from brand "${modelId}"`,
    );
    return this.brandsService.getModelById(modelId, brandId);
  }

  @Post('/:brandId/models/')
  @UsePipes(ValidationPipe)
  createModel(
    @Param('brandId', ParseIntPipe) brandId: number,
    @Body() createModelDto: CreateModelDto,
    @GetUser() user: User,
  ): Promise<Model> {
    this.logger.verbose(
      `User "${
        user.id
      }" creating a new model for brand "${brandId}". Data: ${JSON.stringify(
        createModelDto,
      )}`,
    );
    return this.brandsService.createModel(createModelDto, brandId);
  }

  @Delete('/:brandId/models/:modelId')
  deleteModel(
    @Param('brandId', ParseIntPipe) brandId: number,
    @Param('modelId', ParseIntPipe) modelId: number,
    @GetUser() user: User,
  ): Promise<void> {
    this.logger.verbose(
      `User "${user.id}" deleting a model with id "${modelId}" from brand "${brandId}`,
    );
    return this.brandsService.deleteModel(modelId, brandId);
  }
}

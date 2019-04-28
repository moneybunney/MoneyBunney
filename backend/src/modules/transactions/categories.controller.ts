import {
  Controller,
  Get,
  Post,
  Delete,
  Body,
  Query,
  Param,
  Res,
  UsePipes,
  HttpStatus,
} from '@nestjs/common';
import { CategoryService } from './service/category.service';
import { CategoryDto } from './dto/category.dto';
import { Categories } from './interfaces/category.interface';
import { ValidationPipe } from '../../common/pipes/validation.pipe';
import { ApiOperation, ApiResponse } from '@nestjs/swagger';
import { Logger } from '../logger/logger.service';
import { Response } from 'express';

@Controller('api/transactions/categories')
export class CategoriesController {
  constructor(
    private readonly categoryService: CategoryService,
    private readonly logger: Logger,
  ) {}

  @Post()
  @ApiOperation({ title: 'Create Category' })
  @ApiResponse({
    status: 201,
    description: 'Category successfully received.',
  })
  @ApiResponse({ status: 400, description: 'Bad request.' })
  @UsePipes(new ValidationPipe(new Logger()))
  async createCategory(
    @Body() createCategoryDto: CategoryDto,
    @Res() res: Response,
  ) {
    this.logger.log('Category received:');
    this.logger.log(createCategoryDto.Name);
    this.categoryService.create(createCategoryDto);
    return res.status(HttpStatus.CREATED).send();
  }

  @Get()
  @ApiOperation({ title: 'Get all categories' })
  @ApiResponse({ status: 200, description: 'Categories  response' })
  @ApiResponse({ status: 500, description: 'Server error.' })
  getCategories(): Promise<Categories[]> {
    this.logger.log(`GET to /transactions/categories | getCategories`);
    return this.categoryService.findAll();
  }

  @Get(':id')
  getTest(@Param('id') id: string): Promise<Categories> {
    this.logger.log('GET to /transactions/categories | getCategory');
    return this.categoryService.find(id);
  }

  @Delete()
  @ApiOperation({ title: 'Remove category from database' })
  @ApiResponse({ status: 200, description: 'Category removed.' })
  @ApiResponse({ status: 200, description: 'Category not found.' })
  public async deleteCategory(@Query('id') id: string, @Res() res: Response) {
    this.logger.log('Delete to /transactions/categories | deleteCategory');
    await this.categoryService.remove(id);
    return res.status(HttpStatus.OK).send();
  }
}

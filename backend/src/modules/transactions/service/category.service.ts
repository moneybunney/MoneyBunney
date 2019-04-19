import { Model } from 'mongoose';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Categories } from '../interfaces/category.interface';
import { CategoryDto } from '../dto/category.dto';
import { AppErrorTypeEnum } from '../../../common/error/AppErrorTypeEnum';
import { AppError } from '../../../common/error/AppError';
import { Logger } from '../../logger/logger.service';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel('Categories')
    private readonly categoryModel: Model<Categories>,
    private readonly logger: Logger,
  ) {}

  async create(categoryDTO: CategoryDto): Promise<Categories> {
    const createdCategory = new this.categoryModel(categoryDTO);
    return await createdCategory.save();
  }

  async findAll(): Promise<Categories[]> {
    return await this.categoryModel.find().exec();
  }

  async find(id: string): Promise<Categories> {
    try {
      return await this.categoryModel.findById(id).exec();
    } catch (e) {
      this.logger.log('Requested category was not found!');
      throw new BadRequestException('Requested category was not found!');
    }
  }
}

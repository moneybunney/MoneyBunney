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

  async remove(id: string): Promise<any> {
    try {
      return await this.categoryModel
        .findById(id)
        .remove()
        .exec();
    } catch (e) {
      this.logger.log(e.toString());
      throw new BadRequestException('Requested category was not found!');
    }
  }

  async loadCategories(): Promise<any> {
    let categoryList: CategoryDto[] = [
      { _id: '0', Name: 'Transport', Icon: 'PlaceholderIcon0' },
      { _id: '1', Name: 'Food', Icon: 'PlaceholderIcon1' },
      { _id: '2', Name: 'Entertainment', Icon: 'PlaceholderIcon2' },
      { _id: '3', Name: 'Health', Icon: 'PlaceholderIcon3' },
      { _id: '4', Name: 'Gifts', Icon: 'PlaceholderIcon4' },
      { _id: '5', Name: 'Bills', Icon: 'PlaceholderIcon5' },
      { _id: '6', Name: 'Travel', Icon: 'PlaceholderIcon6' },
      { _id: '7', Name: 'Clothes', Icon: 'PlaceholderIcon7' },
      { _id: '8', Name: 'Personal care', Icon: 'PlaceholderIcon8' },
    ];

    for (let category of categoryList) {
      try {
        let temp = await this.find(category._id);
        if (temp.Name != category.Name || temp.Icon != category.Icon) {
          this.remove(category._id);
          this.create(category);
        }
      } catch (e) {
        this.create(category);
      }
    }
  }
}

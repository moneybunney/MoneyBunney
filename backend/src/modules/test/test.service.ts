import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Test } from './interfaces/test.interface';
import { CreateTestDto } from './dto/create-test.dto';

@Injectable()
export class TestService {
  constructor(@InjectModel('Test') private readonly testModel: Model<Test>) {}

  async create(createTestDto: CreateTestDto): Promise<Test> {
    const createdTest = new this.testModel(createTestDto);
    return await createdTest.save();
  }

  async findAll(): Promise<Test[]> {
    return await this.testModel.find().exec();
  }

  async findById(id: string): Promise<Test> {
    return await this.testModel.findById(id).exec();
  }
}

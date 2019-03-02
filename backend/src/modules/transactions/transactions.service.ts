import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Transactions } from './interfaces/transactions.interface';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(@InjectModel('Transactions') private readonly transactionModel: Model<Transactions>) {}

  async create(createTestDto: CreateTransactionDto): Promise<Transactions> {
    const createdTest = new this.transactionModel(createTestDto);
    return await createdTest.save();
  }

  async findAll(): Promise<Transactions[]> {
    return await this.transactionModel.find().exec();
  }

  async findById(id: string): Promise<Transactions> {
    return await this.transactionModel.findById(id).exec();
  }
}
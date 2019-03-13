import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Transactions } from './interfaces/transactions.interface';
import { CreateTransactionDto } from './dto/create-transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(@InjectModel('Transactions') private readonly transactionModel: Model<Transactions>) {}

  async create(createTransactionDto: CreateTransactionDto): Promise<Transactions> {
    const createdTransaction = new this.transactionModel(createTransactionDto);
    return await createdTransaction.save();
  }

  async findAll(): Promise<Transactions[]> {
    return await this.transactionModel.find().exec();
  }

  async findById(id: string): Promise<Transactions> {
      return await this.transactionModel.findById(id).exec();
  }

  async findByAccount(account: string): Promise<Transactions[]>{
    return await this.transactionModel.find().where('Account', account).exec();
  }

  async findIncome(): Promise<Transactions[]>{
    return await this.transactionModel.find().where('Price').gt(0).exec();
  }

  async findExpenses(): Promise<Transactions[]>{
    return await this.transactionModel.find().where('Price').lt(0).exec();
  }

}
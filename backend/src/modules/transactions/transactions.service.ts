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

  async findByAccount(account: string, type: string, number: number): Promise<Transactions[]>{
    if (type == "expenses" && number == undefined)
    {
      return await this.transactionModel.find().where('Price').lt(0).where('Account', account).exec();
    }
    else if (type == "income" && number == undefined)
    {
      return await this.transactionModel.find().where('Price').gt(0).where('Account', account).exec();
    }
    else if(type == undefined && number != undefined)
    {
      return await this.transactionModel.find().where('Account', account).sort({ _id: -1 }).limit(Number(number)).exec()
    }
    else if(type == "expenses" && number != undefined)
    {
       return await this.transactionModel.find().where('Price').lt(0).where('Account', account).sort({ _id: -1 }).limit(Number(number)).exec()
    }
    else if(type == "income" && number != undefined)
    {
       return await this.transactionModel.find().where('Price').gt(0).where('Account', account).sort({ _id: -1 }).limit(Number(number)).exec()
    }
    else if (type == undefined && number == undefined)
    {
      return await this.transactionModel.find().where('Account', account).exec();
    }
    else return [];
  }

  async findIncome(): Promise<Transactions[]>{
      return await this.transactionModel.find().where('Price').gt(0).exec();
  }

  async findExpenses(): Promise<Transactions[]>{
    return await this.transactionModel.find().where('Price').lt(0).exec();
  }

  async findLatest(nr: number): Promise<Transactions[]>{
    return await this.transactionModel.find().sort({ _id: -1 }).limit(Number(nr)).exec();
  }

}
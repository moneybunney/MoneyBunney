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

  async remove(id: string): Promise<any>{
    try{
      return await this.transactionModel.findById(id).remove().exec();
    }
    catch(e){
      console.log("Bad ID!");
      return null;
    }
  }

  async findById(id: string): Promise<Transactions> {
    try{
      return await this.transactionModel.findById(id).exec();
    }
    catch(e){
      console.log("Bad ID!");
      return null;
    }
  }

  async findAccountTransactions(account: string, date: string, number: number): Promise<Transactions[]>
  {
    if (number == undefined)
      number = 10;
    try{
      return await this.transactionModel.find().where('Account', account).sort({Date: 1}).where('Date').gte(date).limit(Number(number)).exec();
    }
    catch(e){
      console.log("Wrong date format!");
      return [];
    }
  }

  async findAccountExpenses(account: string, date: string, number: number): Promise<Transactions[]>
  {
    if (number == undefined)
      number = 10;
    try{
      return await this.transactionModel.find().where('Account', account).where('Price').lt(0).sort({Date: 1}).where('Date').gte(date).limit(Number(number)).exec();
    }
    catch(e)
    {
      console.log("Wrong date format!");
      return [];
    }
  }

  async findAccountIncome(account: string, date: string, number: number): Promise<Transactions[]>
  {
    if (number == undefined)
      number = 10;
    try{
      return await this.transactionModel.find().where('Account', account).where('Price').gt(0).sort({Date: 1}).where('Date').gte(date).limit(Number(number)).exec();
    }
    catch(e){
      console.log("Wrong date format!");
      return [];
    }
  }

  async findIncome(): Promise<Transactions[]>{
      return await this.transactionModel.find().where('Price').gt(0).exec();
  }

  async findExpenses(): Promise<Transactions[]>{
    return await this.transactionModel.find().where('Price').lt(0).exec();
  }

}
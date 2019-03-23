import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Transactions } from './interfaces/transactions.interface';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { AppErrorTypeEnum } from '../../common/error/AppErrorTypeEnum';
import { AppError } from '../../common/error/AppError';
import { Logger } from '../logger/logger.service';

@Injectable()
export class TransactionsService {
  constructor(@InjectModel('Transactions') private readonly transactionModel: Model<Transactions>,
   private readonly logger: Logger) {}

  async create(TransactionDto: CreateTransactionDto): Promise<Transactions> {
    const createdTransaction = new this.transactionModel(TransactionDto);
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
      this.logger.log(e.toString());
      throw new AppError(AppErrorTypeEnum.TRANSACTION_NOT_FOUND);
    }
  }

  async findById(id: string): Promise<Transactions> {
    try{
      return await this.transactionModel.findById(id).exec();
    }
    catch(e){
      this.logger.log(e.toString());
      throw new AppError(AppErrorTypeEnum.TRANSACTION_NOT_FOUND);
    }
  }

  async findAccountTransactions(account: string, date: string, number: number): Promise<Transactions[]>
  {
    var temp: Transactions[] = [];
    if (number == undefined)
      number = 10;
    try{
       temp = await this.transactionModel.find().where('Account', account).sort({Date: 1}).where('Date').lt(date).limit(Number(number)).exec();
    }
    catch(e){
      this.logger.log(e.toString());
      throw new AppError(AppErrorTypeEnum.VALIDATION_FAILED);
    }
    if(temp.length == 0)
        throw new AppError(AppErrorTypeEnum.TRANSACTION_NOT_FOUND);
    else
        return temp;
  }

  async findAccountExpenses(account: string, date: string, number: number): Promise<Transactions[]>
  {
    var temp: Transactions[] = [];
    if (number == undefined)
      number = 10;
    try{
      temp = await this.transactionModel.find().where('Account', account).where('Price').lt(0).sort({Date: 1}).where('Date').lt(date).limit(Number(number)).exec();
    }
    catch(e)
    {
      this.logger.log(e.toString());
      throw new AppError(AppErrorTypeEnum.VALIDATION_FAILED);
    }
    if(temp.length == 0)
        throw new AppError(AppErrorTypeEnum.TRANSACTION_NOT_FOUND);
    else
        return temp;
  }

  async findAccountIncome(account: string, date: string, number: number): Promise<Transactions[]>
  {
    var temp: Transactions[] = [];
    if (number == undefined)
      number = 10;
    try{
      temp = await this.transactionModel.find().where('Account', account).where('Price').gt(0).sort({Date: 1}).where('Date').lt(date).limit(Number(number)).exec();
    }
    catch(e){
      this.logger.log(e.toString());
      throw new AppError(AppErrorTypeEnum.VALIDATION_FAILED);
    }
    if(temp.length == 0)
        throw new AppError(AppErrorTypeEnum.TRANSACTION_NOT_FOUND);
    else
        return temp;
  }

  async findIncome(): Promise<Transactions[]>{
    var temp: Transactions[] = await this.transactionModel.find().where('Price').gt(0).exec();
    if(temp.length == 0)
        throw new AppError(AppErrorTypeEnum.TRANSACTION_NOT_FOUND);
    else
        return temp;
  }

  async findExpenses(): Promise<Transactions[]>{
    var temp: Transactions[] = await this.transactionModel.find().where('Price').lt(0).exec();
    if(temp.length == 0)
        throw new AppError(AppErrorTypeEnum.TRANSACTION_NOT_FOUND);
    else
        return temp;
  }

}
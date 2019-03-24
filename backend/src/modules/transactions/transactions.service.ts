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

  async remove(id: string): Promise<any> {
    try {
      return await this.transactionModel.findById(id).remove().exec();
    } catch (e) {
      this.logger.log(e.toString());
      throw new AppError(AppErrorTypeEnum.TRANSACTION_NOT_FOUND);
    }
  }

  async findById(id: string): Promise<Transactions> {
    try {
      return await this.transactionModel.findById(id).exec();
    } catch (e) {
      this.logger.log(e.toString());
      throw new AppError(AppErrorTypeEnum.TRANSACTION_NOT_FOUND);
    }
  }

  async findAccountTransactions(account: string, date: string, number: number): Promise<Transactions[]> {
    let temp: Transactions[] = [];
    if (number === undefined) {
      number = 10;
    }
    try {
       temp = await this.transactionModel.find().where('Account', account).sort({Date: 1}).where('Date').lt(date).limit(Number(number)).exec();
    } catch (e) {
      this.logger.log(e.toString());
      throw new AppError(AppErrorTypeEnum.VALIDATION_FAILED, e.toString());
    }
    return temp;
  }

  async findTransactions(date: string, number: number): Promise<Transactions[]> {
    if (number === undefined) {
      number = 10;
    }
    try {
      return await this.transactionModel.find().sort({Date: -1}).where('Date').lt(date).limit(Number(number)).exec();
    } catch (e) {
      this.logger.log(e.toString());
      throw new AppError(AppErrorTypeEnum.VALIDATION_FAILED, e.toString());
      return [];
    }
  }

  async findAccountExpenses(account: string, date: string, number: number): Promise<Transactions[]> {
    let temp: Transactions[] = [];
    if (number === undefined) {
      number = 10;
    }
    try {
      temp = await this.transactionModel.find().where('Account', account).where('Amount').lt(0).sort({Date: 1}).where('Date').lt(date).limit(Number(number)).exec();
    } catch (e) {
      this.logger.log(e.toString());
      throw new AppError(AppErrorTypeEnum.VALIDATION_FAILED, e.toString());
    }
    return temp;
  }

  async findAccountIncome(account: string, date: string, number: number): Promise<Transactions[]> {
    let temp: Transactions[] = [];
    if (number === undefined) {
      number = 10;
    }
    try {
      temp = await this.transactionModel.find().where('Account', account).where('Amount').gt(0).sort({Date: 1}).where('Date').lt(date).limit(Number(number)).exec();
    } catch (e) {
      this.logger.log(e.toString());
      throw new AppError(AppErrorTypeEnum.VALIDATION_FAILED, e.toString());
    }
    return temp;
  }

  async findIncome(): Promise<Transactions[]> {
    return this.transactionModel.find().where('Amount').gt(0).exec();
  }

  async findExpenses(): Promise<Transactions[]> {
    return this.transactionModel.find().where('Amount').lt(0).exec();
  }

}

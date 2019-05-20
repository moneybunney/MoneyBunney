import { Model } from 'mongoose';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Transactions } from '../interfaces/transactions.interface';
import { TransactionDTO } from '../dto/transaction.dto';
import { AppErrorTypeEnum } from '../../../common/error/AppErrorTypeEnum';
import { AppError } from '../../../common/error/AppError';
import { Logger } from '../../logger/logger.service';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel('Transactions')
    private readonly transactionModel: Model<Transactions>,
    private readonly logger: Logger,
  ) {}

  async create(
    TransactionDto: TransactionDTO,
    UserId: string,
  ): Promise<Transactions> {
    const createdTransaction = new this.transactionModel({
      ...TransactionDto,
      UserId,
    });
    return await createdTransaction.save();
  }

  async remove(id: string): Promise<any> {
    try {
      return await this.transactionModel
        .findById(id)
        .remove()
        .exec();
    } catch (e) {
      this.logger.log(e.toString());
      throw new BadRequestException('Requested transaction was not found!');
    }
  }

  async findById(id: string): Promise<Transactions> {
    try {
      return await this.transactionModel.findById(id).exec();
    } catch (e) {
      this.logger.log(e.toString());
      throw new BadRequestException('Requested transaction was not found!');
    }
  }

  async findTransactions(date: string, amount = 10): Promise<Transactions[]> {
    try {
      return await this.transactionModel
        .find()
        .sort({ Date: -1 })
        .where('Date')
        .lt(date)
        .limit(Number(amount))
        .exec();
    } catch (e) {
      this.logger.log(e.toString());
      throw new BadRequestException('Validation failure:' + e.toString());
    }
  }

  findAllTags(UserId: string): Promise<string[]> {
    return this.transactionModel
      .find({ UserId })
      .distinct('Tags')
      .exec();
  }
}

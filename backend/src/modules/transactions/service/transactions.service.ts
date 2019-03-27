import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
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

  async create(TransactionDto: TransactionDTO): Promise<Transactions> {
    const createdTransaction = new this.transactionModel(TransactionDto);
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
}

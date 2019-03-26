import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Transactions } from '../interfaces/transactions.interface';
import { Logger } from '../../logger/logger.service';
import { QueryDTO } from '../dto/query.dto';
import { AnySelector } from './selectors/any.selector';
import { Selector } from './selectors/selector';

import { AppErrorTypeEnum } from 'src/common/error/AppErrorTypeEnum';
import { TransactionDTO } from '../dto/transaction.dto';
import { AppError } from 'src/common/error/AppError';
import { SelectorFactory } from './selectors/selector-repository';

@Injectable()
export class TransactionQueryService {
  private readonly selectorFactory: SelectorFactory<Transactions>;
  constructor(
    @InjectModel('Transactions')
    private readonly transactionModel: Model<Transactions>,
    private readonly logger: Logger,
  ) {
    this.selectorFactory = new SelectorFactory<Transactions>();
  }

  async query(queryRequest: QueryDTO): Promise<TransactionDTO[]> {
    const currentQuery = this.transactionModel.find();
    this.logger.log(queryRequest as any);
    if (!queryRequest || !queryRequest.selectors || queryRequest.selectors.length === 0) {
      return [];
    }
    queryRequest.selectors.forEach((selectorDTO) => {
      const selectorImpl = this.resolveSelector(selectorDTO.Name);
      selectorImpl.ApplySelectorDTO(selectorDTO, currentQuery);
    });
    return currentQuery.exec();
  }

  resolveSelector = (name: string): Selector<Transactions> => {
    return this.selectorFactory.CreateSelector(name);
  }

}

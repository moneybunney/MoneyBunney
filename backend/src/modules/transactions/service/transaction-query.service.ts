import { Model } from 'mongoose';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Transactions } from '../interfaces/transactions.interface';
import { Logger } from '../../logger/logger.service';
import { QueryDTO } from '../../../../../shared/query.dto';
import { Selector } from './selectors/selector';
import { TransactionDTO } from '../dto/transaction.dto';
import { SelectorFactory } from './selector-repository';
import { isTemplateElement } from '@babel/types';

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
    this.logger.log('Query object received:');
    this.logger.log(queryRequest as any);
    if (
      !queryRequest ||
      !queryRequest.selectors ||
      queryRequest.selectors.length === 0
    ) {
      return [];
    }
    queryRequest.selectors.forEach(selectorDTO => {
      const selectorImpl = this.resolveSelector(selectorDTO.Name);
      selectorImpl.ApplySelectorDTO(selectorDTO, currentQuery);
    });
    return currentQuery.exec().catch(e => {
      if (typeof e.message === 'string') {
        throw new BadRequestException(e.message);
      } else {
        throw new BadRequestException(JSON.stringify(e));
      }
    });
  }

  resolveSelector = (name: string): Selector<Transactions> => {
    return this.selectorFactory.CreateSelector(name);
  };
}

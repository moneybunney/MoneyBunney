import { Model, DocumentQuery } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Transactions } from '../interfaces/transactions.interface';
import { Logger } from '../../logger/logger.service';
import { QueryDTO } from '../../../../../shared/query.dto';
import { Selector } from './selectors/selector';
import { SelectorFactory } from './selector.factory';
import { Aggregator } from './aggregators/aggregator';
import { AggregatorFactory } from './aggregator.factory';

@Injectable()
export class TransactionQueryService {
  private readonly selectorFactory: SelectorFactory<Transactions>;
  private readonly aggregatorFactory: AggregatorFactory;
  constructor(
    @InjectModel('Transactions')
    private readonly transactionModel: Model<Transactions>,
    private readonly logger: Logger,
  ) {
    this.selectorFactory = new SelectorFactory<Transactions>();
    this.aggregatorFactory = new AggregatorFactory();
  }

  async query(queryRequest: QueryDTO): Promise<any> {
    let aggregatorName;
    if (
      queryRequest &&
      queryRequest.aggregator &&
      queryRequest.aggregator.Name
    ) {
      aggregatorName = queryRequest.aggregator.Name;
    }
    const aggregator = this.resolveAggregator(aggregatorName);
    return aggregator.ApplyAggregatorDTO(
      () => this.getQueryWithAppliedSelectors(queryRequest),
      queryRequest.aggregator,
      this.transactionModel,
    );
  }

  public getQueryWithAppliedSelectors(
    queryRequest: QueryDTO,
  ): DocumentQuery<Transactions[], Transactions, any> {
    const currentQuery = this.transactionModel.find();
    this.logger.log('Query object received:');
    this.logger.log(JSON.stringify(queryRequest));
    if (
      !queryRequest ||
      !queryRequest.selectors ||
      queryRequest.selectors.length === 0
    ) {
      return currentQuery.limit(0);
    }
    queryRequest.selectors.forEach(selectorDTO => {
      const selectorImpl = this.resolveSelector(selectorDTO.Name);
      selectorImpl.ApplySelectorDTO(selectorDTO, currentQuery);
    });
    return currentQuery;
  }

  resolveSelector = (name: string): Selector<Transactions> => {
    return this.selectorFactory.CreateSelector(name);
  };

  resolveAggregator = (name: string): Aggregator => {
    return this.aggregatorFactory.CreateAggregator(name);
  };
}

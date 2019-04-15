import { DocumentQuery, Model } from 'mongoose';
import { AggregatorDTO } from '../../../../../../shared/aggregator.dto';
import { BadRequestException } from '@nestjs/common';
import { Transactions } from '../../interfaces/transactions.interface';

export abstract class Aggregator {
  public abstract GetName(): string;

  public ApplyAggregatorDTO = (
    postSelectorQuery: () => DocumentQuery<Transactions[], Transactions, {}>,
    aggregatorDTO: AggregatorDTO,
    transactionsModel: Model<Transactions>,
  ): Promise<any> => {
    this.ValidateAggregatorDTO(aggregatorDTO);
    return this.ApplyValidatedAggregatorDTO(
      postSelectorQuery,
      aggregatorDTO,
      transactionsModel,
    );
  };

  protected abstract ApplyValidatedAggregatorDTO(
    postSelectorQuery: () => DocumentQuery<Transactions[], Transactions, {}>,
    aggregatorDTO: AggregatorDTO,
    transactionsModel: Model<Transactions>,
  ): Promise<any>;

  protected abstract ValidateAggregatorDTO(aggregatorDTO: AggregatorDTO): void;
}

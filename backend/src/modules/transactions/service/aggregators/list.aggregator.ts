import { Aggregator } from './aggregator';
import { DocumentQuery, Model } from 'mongoose';
import { AggregatorDTO } from '../../../../../../shared/aggregator.dto';
import { Transactions } from '../../interfaces/transactions.interface';
import { BadRequestException } from '@nestjs/common';

/**
 * The simplest aggegator - no aggegation
 * returns a list of items that the selectors filter.
 */
export class ListAggregator extends Aggregator {
  public GetName(): string {
    return 'list';
  }

  protected async ApplyValidatedAggregatorDTO(
    postSelectorQuery: () => DocumentQuery<Transactions[], Transactions, {}>,
    aggregatorDTO: AggregatorDTO,
    transactionsModel: Model<Transactions>,
  ): Promise<any> {
    try {
      return postSelectorQuery().exec();
    } catch (e) {
      if (typeof e.message === 'string') {
        throw new BadRequestException(e.message);
      } else {
        throw new BadRequestException(JSON.stringify(e));
      }
    }
  }

  protected ValidateAggregatorDTO(aggregatorDTO: AggregatorDTO): void {
    return;
  }
}

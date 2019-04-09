import { DocumentQuery, Document } from 'mongoose';
import { AggregatorDTO } from '../../../../../../shared/aggregator.dto';
import { BadRequestException } from '@nestjs/common';
import { Transactions } from '../../interfaces/transactions.interface';
import { SelectorDTO } from '../../../../../../shared/selector.dto';

export abstract class Aggregator {
  public abstract GetName(): string;

  public ApplyAggregatorDTO = (
    postSelectorQuery: () => DocumentQuery<Transactions[], Transactions, {}>,
    aggregatorDTO: AggregatorDTO,
  ): Promise<any> => {
    this.ValidateAggregatorName(aggregatorDTO);
    this.ValidateAggregatorDTO(aggregatorDTO);
    return this.ApplyValidatedAggregatorDTO(postSelectorQuery, aggregatorDTO);
  };

  protected abstract ApplyValidatedAggregatorDTO(
    postSelectorQuery: () => DocumentQuery<Transactions[], Transactions, {}>,
    aggregatorDTO: AggregatorDTO,
  ): Promise<any>;

  protected abstract ValidateAggregatorDTO(aggregatorDTO: AggregatorDTO): void;

  private ValidateAggregatorName(aggregatorDTO: AggregatorDTO): void {
    if (aggregatorDTO.Name !== this.GetName()) {
      throw new BadRequestException(
        'Invalid selector name:' + aggregatorDTO.Name + '!==' + this.GetName(),
      );
    }
  }
}

import { Aggregator } from './aggregator';
import { DocumentQuery, Model } from 'mongoose';
import { AggregatorDTO } from '../../../../../../shared/aggregator.dto';
import { BalanceResponseObjectDTO } from '../../../../../../shared/aggregator-responses/balance.response.dto';
import {
  Transactions,
  TransactionsUtils,
} from '../../interfaces/transactions.interface';
import { BadRequestException } from '@nestjs/common';
import { IsString, validateSync, IsNumber } from 'class-validator';
import { plainToClass } from 'class-transformer';

/**
 * This is the balance over a key aggregator
 */
export class BalanceAggregator extends Aggregator {
  public GetName(): string {
    return 'balance';
  }

  protected async ApplyValidatedAggregatorDTO(
    postSelectorQuery: () => DocumentQuery<Transactions[], Transactions, {}>,
    aggregatorDTO: AggregatorDTO,
    transactionsModel: Model<Transactions>,
  ): Promise<any> {
    return new Promise(async (resolve, reject) => {
      const payload = aggregatorDTO.Payload as BalanceAggregatorPayloadDTO;
      const count = await postSelectorQuery().count(); // this is pretty inefficient
      const cursor = await postSelectorQuery().cursor();
      const response = [];
      let balance = 0;
      let index = 0;
      cursor
        .on('data', elem => {
          // sums all the elements to get an accurate balance
          balance = balance + elem.Amount;
          if (index >= count - payload.take || payload.take === 0) {
            // only keep the required amount of elements in-memory

            const keyObj = elem[payload.key];
            let key: any;
            if (keyObj instanceof Date) {
              // we use the iso format for dates
              key = keyObj.toISOString();
            } else {
              key = keyObj;
            }

            const o: BalanceResponseObjectDTO = { Key: key, Balance: balance };
            response.push(o);
          }
          index++;
        })
        .on('end', () => {
          resolve(response);
        });
    });
  }

  protected ValidateAggregatorDTO(aggregatorDTO: AggregatorDTO): void {
    const classObject = plainToClass<BalanceAggregatorPayloadDTO, {}>(
      BalanceAggregatorPayloadDTO,
      aggregatorDTO.Payload,
    );
    const errors = validateSync(classObject);
    if (errors.length > 0) {
      throw new BadRequestException(
        'Validation failed!',
        JSON.stringify(errors),
      );
    }

    if (TransactionsUtils.GetEquatableFields().indexOf(classObject.key) < 0) {
      throw new BadRequestException(
        "Can't get field (not allowed):" + classObject.key,
      );
    }
  }
}

class BalanceAggregatorPayloadDTO {
  @IsNumber()
  readonly take: number;

  @IsString()
  readonly key: string;
}

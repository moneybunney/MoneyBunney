import { Aggregator } from './aggregator';
import { DocumentQuery, Model } from 'mongoose';
import { AggregatorDTO } from '../../../../../../shared/aggregator.dto';
import {
  Transactions,
  TransactionsUtils,
} from '../../interfaces/transactions.interface';
import { BadRequestException } from '@nestjs/common';
import { IsString, validateSync } from 'class-validator';
import { plainToClass } from 'class-transformer';

/**
 *
 */
export class SumAggregator extends Aggregator {
  public GetName(): string {
    return 'sum';
  }

  protected async ApplyValidatedAggregatorDTO(
    postSelectorQuery: () => DocumentQuery<Transactions[], Transactions, {}>,
    aggregatorDTO: AggregatorDTO,
    transactionsModel: Model<Transactions>,
  ): Promise<any> {
    const payload = aggregatorDTO.Payload as SumAggregatorPayloadDTO;
    return new Promise((resolve, reject) => {
      transactionsModel.distinct(
        payload.distinctColumn,
        (err, uniqueValues) => {
          if (err) {
            reject(err);
          }
          const response = new SumAggregatorResponseDTO();
          const queries = [];
          uniqueValues.forEach(k => {
            try {
              const query = postSelectorQuery()
                .where(payload.distinctColumn, k)
                .exec();
              queries.push(query);
            } catch (e) {
              reject(e);
            }
          });
          Promise.all(queries)
            .then(resolutions => {
              resolutions.forEach((elements, index) => {
                const key = uniqueValues[index];
                let sum = 0;
                elements.forEach(e => {
                  sum += e.Amount;
                });
                response[key] = sum;
              });
              resolve(response);
            })
            .catch(e => {
              reject(e);
            });
        },
      );
    });
  }

  protected ValidateAggregatorDTO(aggregatorDTO: AggregatorDTO): void {
    const classObject = plainToClass<SumAggregatorPayloadDTO, {}>(
      SumAggregatorPayloadDTO,
      aggregatorDTO.Payload,
    );
    const errors = validateSync(classObject);
    if (errors.length > 0) {
      throw new BadRequestException(
        'Validation failed!',
        JSON.stringify(errors),
      );
    }
    if (
      TransactionsUtils.GetDistinctableFields().indexOf(
        classObject.distinctColumn,
      ) < 0
    ) {
      throw new BadRequestException(
        "Can't get field (not allowed):" + classObject.distinctColumn,
      );
    }
  }
}

class SumAggregatorPayloadDTO {
  @IsString()
  readonly distinctColumn: string;
}

class SumAggregatorResponseDTO {
  [uniqueKey: string]: number;
}

import { Aggregator } from './aggregator';
import { DocumentQuery, Model } from 'mongoose';
import { AggregatorDTO } from '../../../../../../shared/aggregator.dto';
import { SumResponseObjectDTO } from '../../../../../../shared/aggregator-responses/sum.response.dto';
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
          const response = [];
          const queries = [];
          uniqueValues.forEach(k => {
            try {
              const query = postSelectorQuery()
                .where(payload.distinctColumn, k)
                .sort('Date')
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
                if (payload.dateAggregation && elements.length > 0) {
                  const dates = this.generateDates(
                    elements[0].Date,
                    elements[elements.length - 1].Date,
                    payload.dateAggregation,
                  );
                  dates.forEach(date => {
                    sum = 0;
                    let dateKey: string;
                    if (payload.dateAggregation === 'Year') {
                      dateKey = date.year.toString();
                      elements.forEach(e => {
                        if (e.Date.getFullYear() === date.year) {
                          sum += e.Amount;
                        }
                      });
                    }
                    if (payload.dateAggregation === 'Month') {
                      dateKey = `${date.year}-${date.month}`;
                      elements.forEach(e => {
                        if (
                          e.Date.getFullYear() === date.year &&
                          e.Date.getMonth() + 1 === date.month
                        ) {
                          sum += e.Amount;
                        }
                      });
                    }
                    response.push({ Key: key, DateKey: dateKey, Sum: sum });
                  });
                } else {
                  elements.forEach(e => {
                    sum += e.Amount;
                  });
                  const o: SumResponseObjectDTO = { Key: key, Sum: sum };
                  response.push(o);
                }
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

  private generateDates(
    startDate: Date,
    endDate: Date,
    aggregation: string,
  ): IDate[] {
    let year = startDate.getFullYear();
    const dates: IDate[] = [];
    switch (aggregation) {
      case 'Year':
        while (year !== endDate.getFullYear() + 1) {
          dates.push({ year });
          year++;
        }
        return dates;
      case 'Month':
        let month = startDate.getMonth() + 1;
        while (
          (year !== endDate.getFullYear() ||
            month !== endDate.getMonth() + 2) &&
          (year !== endDate.getFullYear() + 1 || endDate.getMonth() === 11)
        ) {
          dates.push({ year, month });
          month++;
          if (month > 12) {
            month = 1;
            year++;
          }
        }
        return dates;
      default:
        throw new BadRequestException('Invalid date aggregation type.');
    }
  }
}

interface IDate {
  year: number;
  month?: number;
}

class SumAggregatorPayloadDTO {
  @IsString()
  readonly distinctColumn: string;
  readonly dateAggregation?: string;
}

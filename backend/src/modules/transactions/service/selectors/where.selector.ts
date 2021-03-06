import { Selector } from './selector';
import { Document, DocumentQuery } from 'mongoose';
import { TransactionsUtils } from '../../interfaces/transactions.interface';
import {
  IsString,
  IsDefined,
  ValidateNested,
  validateSync,
} from 'class-validator';
import { plainToClass, Type } from 'class-transformer';
import { BadRequestException } from '@nestjs/common';
import { SelectorDTO } from '../../../../../../shared/selector.dto';

export class WhereSelector<T extends Document> extends Selector<T> {
  public GetName(): string {
    return 'where';
  }

  protected Operators = {
    eq: (query: DocumentQuery<T[], T, {}>, key: string, value: object) =>
      query.where(key, value),
    lt: (query: DocumentQuery<T[], T, {}>, key: string, value: object) =>
      query.lt(key, value),
    lte: (query: DocumentQuery<T[], T, {}>, key: string, value: object) =>
      query.lte(key, value),
    gt: (query: DocumentQuery<T[], T, {}>, key: string, value: object) =>
      query.gt(key, value),
    gte: (query: DocumentQuery<T[], T, {}>, key: string, value: object) =>
      query.gte(key, value),
    in: (query: DocumentQuery<T[], T, {}>, key: string, value: any[]) =>
      query.in(key, value),
  };

  ApplyValidatedSelectorDTO = (
    selectorDTO: SelectorDTO,
    currentQuery: DocumentQuery<T[], T, {}>,
  ): DocumentQuery<T[], T, {}> => {
    const operator = this.Operators[selectorDTO.Payload.Relationship];
    return operator(currentQuery, selectorDTO.Key, selectorDTO.Payload.Value);
  };

  ValidateSelectorDTO = (selectorDTO: SelectorDTO): void => {
    const classObject = plainToClass<WhereSelectorDTO, SelectorDTO>(
      WhereSelectorDTO,
      selectorDTO,
    );
    const errors = validateSync(classObject);
    if (errors.length > 0) {
      throw new BadRequestException(
        'Validation failed: ' + JSON.stringify(errors),
      );
    }

    if (this.Operators[classObject.Payload.Relationship] === undefined) {
      throw new BadRequestException(
        'Matching query operator not found for ' +
          classObject.Payload.Relationship,
      );
    }

    if (TransactionsUtils.GetEquatableFields().indexOf(classObject.Key) < 0) {
      throw new BadRequestException("Can't get field:" + classObject.Key);
    }
  };
}

class WhereValueDTO {
  @IsString({ message: 'Object elationship must be specified' })
  readonly Relationship: string;

  @IsDefined({ message: 'Object must be defined!' })
  readonly Value: object;
}

class WhereSelectorDTO {
  @IsString()
  readonly Key: string;

  @ValidateNested()
  @Type(() => WhereValueDTO)
  Payload: WhereValueDTO;
}

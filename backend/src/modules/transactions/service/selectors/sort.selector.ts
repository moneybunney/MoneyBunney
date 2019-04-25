import { Selector } from './selector';
import { Document, DocumentQuery } from 'mongoose';
import { SelectorDTO } from '../../../../../../shared/selector.dto';
import { TransactionsUtils } from '../../interfaces/transactions.interface';
import { IsString, IsNumber, validateSync } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { BadRequestException } from '@nestjs/common';

export class SortSelector<T extends Document> extends Selector<T> {
  public GetName(): string {
    return 'sort';
  }

  ApplyValidatedSelectorDTO = (
    selectorDTO: SelectorDTO,
    currentQuery: DocumentQuery<T[], T, {}>,
  ): DocumentQuery<T[], T, {}> => {
    const sortObj = {};
    // eventually we might need to pass a more complex object here
    sortObj[selectorDTO.Key] = selectorDTO.Payload as number;
    return currentQuery.sort(sortObj);
  };

  ValidateSelectorDTO = (selectorDTO: SelectorDTO): void => {
    const classObject = plainToClass(SortSelectorDTO, selectorDTO);
    const errors = validateSync(classObject);
    if (errors.length > 0) {
      throw new BadRequestException(
        'Validation failed!',
        JSON.stringify(errors),
      );
    }

    if (TransactionsUtils.GetSortableFields().indexOf(selectorDTO.Key) < 0) {
      this.ThrowValidationErr('Invalid key given!');
    }

    const sortOrder = classObject.Payload;
    if (!(sortOrder === -1 || sortOrder === 1)) {
      this.ThrowValidationErr('Invalid value (sort order) given!');
    }
  };
}

class SortSelectorDTO {
  @IsString()
  Name: string;

  @IsString()
  readonly Key: string;

  @IsNumber()
  Payload: number;
}

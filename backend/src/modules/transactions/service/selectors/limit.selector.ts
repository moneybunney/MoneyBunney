import { Selector } from './selector';
import { Document, DocumentQuery } from 'mongoose';
import { SelectorDTO } from '../../../../../../shared/selector.dto';
import { validateSync, IsNumber } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { BadRequestException } from '@nestjs/common';

export class LimitSelector<T extends Document> extends Selector<T> {
  public GetName(): string {
    return 'limit';
  }

  ApplyValidatedSelectorDTO = (
    selectorDTO: SelectorDTO,
    currentQuery: DocumentQuery<T[], T, {}>,
  ): DocumentQuery<T[], T, {}> => {
    return currentQuery.limit(selectorDTO.Payload);
  };

  ValidateSelectorDTO = (selectorDTO: SelectorDTO): void => {
    const classObject = plainToClass(LimitSelectorDTO, selectorDTO);
    const errors = validateSync(classObject);
    if (errors.length > 0) {
      throw new BadRequestException(
        'Validation failed!',
        JSON.stringify(errors),
      );
    }

    if (classObject.Payload <= 0) {
      throw new BadRequestException('Invalid limit amount!');
    }
  };
}

class LimitSelectorDTO {
  @IsNumber()
  Payload: number;
}

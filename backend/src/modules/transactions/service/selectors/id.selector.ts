import { Selector } from './selector';
import { Document, DocumentQuery } from 'mongoose';
import { SelectorDTO } from '../../../../../../shared/selector.dto';
import { IsString, IsMongoId, validateSync } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { BadRequestException } from '@nestjs/common';

export class IdSelector<T extends Document> extends Selector<T> {
  public GetName(): string {
    return 'id';
  }

  ApplyValidatedSelectorDTO = (
    selectorDTO: SelectorDTO,
    currentQuery: DocumentQuery<T[], T, {}>,
  ): DocumentQuery<T[], T, {}> => {
    return currentQuery.where('_id', selectorDTO.Payload);
  };

  ValidateSelectorDTO = (selectorDTO: SelectorDTO): void => {
    const classObject = plainToClass(IdSelectorDTO, selectorDTO);
    const errors = validateSync(classObject);
    if (errors.length > 0) {
      throw new BadRequestException(
        'Validation failed!',
        JSON.stringify(errors),
      );
    }
    const keyTruthy = Boolean(selectorDTO.Key);
    const keyIsString =
      selectorDTO.Key instanceof String || typeof selectorDTO.Key === 'string';
    if (
      keyTruthy && // the key can be assumed here
      (keyIsString && selectorDTO.Key === '_id')
    ) {
      this.ThrowValidationErr('Invalid key given');
    }
  };
}

class IdSelectorDTO {
  @IsString()
  Payload: string;
}

import { Selector } from './selector';
import { Document, DocumentQuery } from 'mongoose';
import { SelectorDTO } from '../../dto/selector.dto';
import { ValidataionUtils } from 'src/common/utility/validation.utils';
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
        return currentQuery.where('_id', selectorDTO.Value);
    }

    ValidateSelectorDTO = (selectorDTO: SelectorDTO): void  => {
        const classObject = plainToClass(IdSelectorDTO, selectorDTO);
        const errors = validateSync(classObject);
        if (errors.length > 0) {
            throw new BadRequestException('Validation failed!', JSON.stringify(errors));
        }
        const keyTruthly = Boolean(selectorDTO.Key);
        const keyIsString = ValidataionUtils.isString(selectorDTO.Key);
        if (keyTruthly && // the key can be assumed here
            (keyIsString && selectorDTO.Key === '_id')
            ) {
            this.ThrowValidationErr('Invalid key given');
        }
    }
}

class IdSelectorDTO {
    @IsString()
    Value: string;
}

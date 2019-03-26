import { Selector } from './selector';
import { Document, DocumentQuery } from 'mongoose';
import { SelectorDTO } from '../../dto/selector.dto';
import { ValidataionUtils } from 'src/common/utility/validation.utils';

export class IdSelector<T extends Document> extends Selector<T> {
    public getName(): string {
        return 'id';
    }

    ApplyValidatedSelectorDTO = (
        selectorDTO: SelectorDTO,
        currentQuery: DocumentQuery<T[], T, {}>,
        ): DocumentQuery<T[], T, {}> => {
        return currentQuery.where('_id', selectorDTO.Value);
    }
    ValidateSelectorDTO = (selectorDTO: SelectorDTO): void  => {
        if (!ValidataionUtils.isString(selectorDTO.Value)
            ) {
            this.ThrowValidationErr('Invalid selector value given');
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

import { Selector } from './selector';
import { Document, DocumentQuery } from 'mongoose';
import { SelectorDTO } from '../../dto/selector.dto';
import { ValidataionUtilities } from 'src/common/utility/validation.utilities';

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
        if (!(selectorDTO.Value instanceof String ||
              typeof selectorDTO.Value === 'string')
            ) {
            this.ThrowValidationErr('Invalid selector value given');
        }

        const keyTrue = Boolean(selectorDTO.Key);
        const keyIsString = ValidataionUtilities.isString(selectorDTO.Key);
        if (keyTrue && // the key can be assumed here
            (keyIsString && selectorDTO.Key === '_id')
            ) {
            this.ThrowValidationErr('Invalid key given');
        }
    }
}

import { Selector } from './selector';
import { Document, DocumentQuery } from 'mongoose';
import { SelectorDTO } from '../../dto/selector.dto';
import { ValidataionUtils } from 'src/common/utility/validation.utils';
import { TransactionsUtils } from '../../interfaces/transactions.interface';

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
        sortObj[selectorDTO.Key] = selectorDTO.Value as number;
        return currentQuery.sort(sortObj);
    }

    ValidateSelectorDTO = (selectorDTO: SelectorDTO): void  => {
        const keyTruthly = Boolean(selectorDTO.Key);
        const keyIsString = ValidataionUtils.isString(selectorDTO.Key);
        if (   !keyTruthly
            || !keyIsString
            || (TransactionsUtils.GetSortableFields().indexOf(selectorDTO.Key) < 0)
            ) {
            this.ThrowValidationErr('Invalid key given!');
        }
        const valueTruthly = Boolean(selectorDTO.Value);
        const valueInteger = Boolean(selectorDTO.Value instanceof Number || typeof selectorDTO.Value === 'number');
        if (   !valueTruthly
            || !valueInteger
            ) {
            this.ThrowValidationErr('Invalid selector value given (A number is required)');
        }
        const sortOrder = selectorDTO.Value as number;
        if (!(sortOrder === -1 || sortOrder === 1)) {
            this.ThrowValidationErr('Invalid value (sort order) given!');
        }
    }
}

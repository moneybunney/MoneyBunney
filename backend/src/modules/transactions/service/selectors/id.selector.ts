import { Selector } from './selector';
import { Document, DocumentQuery } from 'mongoose';
import { SelectorDTO } from '../../dto/selector.dto';
import { AppError } from 'src/common/error/AppError';
import { AppErrorTypeEnum } from 'src/common/error/AppErrorTypeEnum';

export class IdSelector<T extends Document> extends Selector<T> {
    private static readonly selectorName = 'id';
    ApplyValidatedSelectorDTO = (
        selectorDTO: SelectorDTO,
        currentQuery: DocumentQuery<T[], T, {}>,
        ): DocumentQuery<T[], T, {}> => {
        return currentQuery.where('_id', selectorDTO.Value);
    }
    ValidateSelectorDTO = (selectorDTO: SelectorDTO): void  => {
        if (!(selectorDTO.Value instanceof String)) {
            this.ThrowValidationErr('Invalid selector value given');
        }
        if (selectorDTO.KeyName && // the key can be assumed
            (
                !(selectorDTO.KeyName instanceof String) ||
                selectorDTO.KeyName !== '_id'
            )
            ) {
            this.ThrowValidationErr('Invalid key given');
        }
    }
}

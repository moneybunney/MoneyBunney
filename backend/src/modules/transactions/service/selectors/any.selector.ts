import { Selector } from './selector';
import { Document, DocumentQuery } from 'mongoose';
import { SelectorDTO } from '../../../../../../shared/selector.dto';

export class AnySelector<T extends Document> extends Selector<T> {
  public GetName(): string {
    return 'any';
  }

  protected ApplyValidatedSelectorDTO = (
    selectorDTO: SelectorDTO,
    currentQuery: DocumentQuery<T[], T, {}>,
  ): DocumentQuery<T[], T, {}> => {
    return currentQuery;
  };

  // tslint:disable-next-line:no-empty
  protected ValidateSelectorDTO = (): void => {};
}

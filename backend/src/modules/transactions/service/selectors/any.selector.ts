import { ISelector } from './selector';
import { Document, DocumentQuery } from 'mongoose';

export class AnySelector<T extends Document> implements ISelector<T> {

    ApplySelector(currentQuery: DocumentQuery<T[], T, {}>): DocumentQuery<T[], T, {}> {
        return currentQuery;
    }

}

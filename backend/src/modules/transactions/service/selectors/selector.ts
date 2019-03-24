import { DocumentQuery } from 'mongoose';
import { Document } from 'mongoose';

export interface ISelector<T extends Document> {
    ApplySelector(currentQuery: DocumentQuery<T[], T, {}>): void;
}

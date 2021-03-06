import { Document } from 'mongoose';

export interface Transactions extends Document {
  readonly Date: string;
  readonly Account: string;
  readonly Category: string;
  readonly Amount: number;
  readonly Description: string;
  readonly Tags: string[];
  readonly UserId: string;
}

export class TransactionsUtils {
  // these are used in the transaction query service, to
  // disallow access to database-private fields such as _id
  // in the query language
  static GetSortableFields(): string[] {
    return ['Date', 'Amount'];
  }

  static GetEquatableFields(): string[] {
    return [
      'Date',
      'Account',
      'Amount',
      'Category',
      'Description',
      'Tags',
      'UserId',
    ];
  }

  static GetDistinctableFields(): string[] {
    return ['Date', 'Account', 'Category', 'Tags'];
  }
}

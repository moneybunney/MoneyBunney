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
  static GetSortableFields(): string[] {
    return ['Date', 'Price'];
  }

  static GetEquatableFields(): string[] {
    return ['Date', 'Account', 'Price', 'Description', 'Tags'];
  }
}

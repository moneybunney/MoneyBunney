import { Document } from 'mongoose';

export interface Transactions extends Document {
  readonly Date: object;
  readonly Account: string;
  readonly Category: string;
  readonly Price: number;
  readonly Description: string;
  readonly Tags: string[];
}

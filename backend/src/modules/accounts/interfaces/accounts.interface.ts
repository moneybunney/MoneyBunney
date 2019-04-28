import { Document } from 'mongoose';

export interface Accounts extends Document {
  readonly Name: string;
  readonly InitialBalance: number;
}

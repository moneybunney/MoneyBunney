import { Document } from 'mongoose';

export interface Accounts extends Document {
  readonly Name: string;
  readonly InitialBalance: number;
}

export class AccountsUtils {
  static GetEquatableFields(): string[] {
    return ['Name', 'InitialBalance'];
  }
}

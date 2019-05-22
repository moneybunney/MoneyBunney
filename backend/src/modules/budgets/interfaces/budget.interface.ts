import { Document } from 'mongoose';

export interface Budget extends Document {
  readonly Category: string;
  readonly StartDate: string;
  readonly EndDate: string;
  readonly Amount: number;
  readonly UserId: string;
}

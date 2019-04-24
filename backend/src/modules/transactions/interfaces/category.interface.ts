import { Document } from 'mongoose';

export interface Categories extends Document {
  readonly Name: string;
  readonly Icon: string;
  readonly _id: string;
}

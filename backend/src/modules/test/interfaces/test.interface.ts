import { Document } from 'mongoose';

export interface Test extends Document {
    readonly StringVariable: string;
    readonly IntVariable: number;
    readonly ObjectVariable: any;
}

import {Document} from 'mongoose';

export interface Users extends Document{
    readonly Username: string;
    readonly Password: string;
}
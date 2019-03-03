import {Document} from 'mongoose';

export interface User extends Document{
    readonly Username: string;
    readonly Password: string;
    readonly Token: string;
}
import { IsString } from 'class-validator';

export class SelectorDTO {
    readonly Name: string;
    readonly Key?: any;
    readonly Value?: any;
}

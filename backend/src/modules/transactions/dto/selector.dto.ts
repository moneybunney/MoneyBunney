import { IsString } from 'class-validator';

export class SelectorDTO {
    @IsString({message: 'Name must be a string!'})
    readonly Name: string;

    readonly Key?: any;

    readonly Value?: any;
}

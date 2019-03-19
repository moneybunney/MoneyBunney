import { IsString, IsNumber, IsDate, IsArray, IsDateString} from 'class-validator';

export class CreateTransactionDto {

	@IsDateString()
    readonly Date: object;

    @IsString()
    readonly Account: string;

    @IsString()
    readonly Category: string;

    @IsNumber()
    readonly Price: number;

    @IsString()
    readonly Description: string;

    @IsArray()
    readonly Tags: string[];
}

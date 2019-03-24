import { IsString, IsNumber, IsDate, IsArray, IsDateString} from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CreateTransactionDto {

	@ApiModelProperty()
	@IsDateString()
    readonly Date: object;

    @ApiModelProperty()
    @IsString()
    readonly Account: string;

    @ApiModelProperty()
    @IsString()
    readonly Category: string;

    @ApiModelProperty()
    @IsNumber()
    readonly Price: number;

    @ApiModelProperty()
    @IsString()
    readonly Description: string;

    @ApiModelProperty({ type: [String] })
    @IsArray()
    readonly Tags: string[];
}

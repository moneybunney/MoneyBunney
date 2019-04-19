import {
  IsString,
  IsNumber,
  IsDate,
  IsArray,
  IsDateString,
} from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class TransactionDTO {
  /**
   * Date string of ISOString fromat
   */
  @ApiModelProperty()
  @IsDateString()
  readonly Date: string;

  @ApiModelProperty()
  @IsString()
  readonly Account: string;

  @ApiModelProperty()
  @IsString()
  Category: any;

  @ApiModelProperty()
  @IsNumber()
  readonly Amount: number;

  @ApiModelProperty()
  @IsString()
  readonly Description: string;

  @ApiModelProperty({ type: [String] })
  @IsArray()
  readonly Tags: string[];
}

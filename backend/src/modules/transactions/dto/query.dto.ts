import {
    IsString,
    IsNumber,
    IsDate,
    IsArray,
    IsDateString,
  } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { SelectorDTO } from './selector.dto';

export class QueryDTO {
    readonly selectors?: SelectorDTO[];

    readonly aggregator?: string;
  }

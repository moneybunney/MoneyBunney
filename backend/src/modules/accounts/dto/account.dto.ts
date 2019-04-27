import { IsString, IsNumber } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class AccountDTO {
  @ApiModelProperty()
  @IsString()
  readonly Name: string;

  @ApiModelProperty()
  @IsNumber()
  readonly InitialBalance: number;
}

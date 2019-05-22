import { ApiModelProperty } from '@nestjs/swagger';

export class CreateBudgetDTO {
  @ApiModelProperty()
  readonly Category: string;

  @ApiModelProperty()
  readonly StartDate: string;

  @ApiModelProperty()
  readonly EndDate: string;

  @ApiModelProperty()
  readonly Amount: number;
}

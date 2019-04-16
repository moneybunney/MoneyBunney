import { IsString, IsNumber } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';

export class CategoryDto {
  @ApiModelProperty()
  @IsString()
  readonly Name: string;

  @ApiModelProperty()
  @IsString()
  readonly Icon: string;
}

import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { validate } from 'class-validator';
import { plainToClass } from 'class-transformer';
import { AppErrorTypeEnum } from '../error/AppErrorTypeEnum';
import { AppError } from '../error/AppError';
import { Logger } from '../../modules/logger/logger.service';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  constructor(private readonly logger: Logger) {}
  async transform(value, { metatype }: ArgumentMetadata) {
    if (!metatype) {
      return value;
    }
    const object = plainToClass(metatype, value);
    const errors = await validate(object);
    if (errors.length > 0) {
      this.logger.log(errors.toString());
      throw new AppError(AppErrorTypeEnum.VALIDATION_FAILED, errors.toString());
    }
    return value;
  }

  private toValidate(metatype): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return types.includes(metatype);
  }
}

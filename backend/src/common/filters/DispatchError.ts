import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  UnauthorizedException,
  NotFoundException,
  HttpException,
} from '@nestjs/common';
import { AppError } from '../error/AppError';
import { restElement } from '@babel/types';

@Catch()
export class DispatchError implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const res = ctx.getResponse();

    if (exception instanceof AppError) {
      return res.status(exception.httpStatus).json({
        errorCode: exception.errorCode,
        errorMsg: exception.errorMessage,
        usrMsg: exception.userMessage,
        httpCode: exception.httpStatus,
      });
    } else if (exception instanceof UnauthorizedException) {
      console.log(exception.message);
      console.error(exception.stack);
      return res.status(HttpStatus.UNAUTHORIZED).json(exception.message);
    } else if (exception.status === 403) {
      return res.status(HttpStatus.FORBIDDEN).json(exception.message);
    } else if (exception instanceof NotFoundException) {
      console.log(exception.message);
      return res.status(HttpStatus.NOT_FOUND).json(exception.message);
    } else if (exception instanceof HttpException) {
      return res.status(exception.getStatus()).json(exception.getResponse());
    } else {
      console.error(exception.message);
      console.error(exception.stack);
      return res.status(HttpStatus.INTERNAL_SERVER_ERROR).send();
    }
  }
}

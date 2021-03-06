import { AppErrorTypeEnum } from './AppErrorTypeEnum';
import { IErrorMessage } from './IErrorMessage';
import { HttpStatus } from '@nestjs/common';

export class AppError extends Error {
  public errorCode: AppErrorTypeEnum;
  public httpStatus: number;
  public errorMessage: string;
  public userMessage: string;

  constructor(errorCode: AppErrorTypeEnum, msg?: string) {
    super();
    const errorMessageConfig: IErrorMessage = this.getError(errorCode);
    if (!errorMessageConfig) {
      throw new Error('Unable to find message code error.');
    }

    Error.captureStackTrace(this, super.constructor());
    this.name = this.constructor.name;
    this.httpStatus = errorMessageConfig.httpStatus;
    this.errorCode = errorCode;
    if (msg) {
      this.errorMessage = msg;
    } else {
      this.errorMessage = errorMessageConfig.errorMessage;
    }
    this.userMessage = errorMessageConfig.userMessage;
  }

  private getError(errorCode: AppErrorTypeEnum): IErrorMessage {
    let res: IErrorMessage;

    switch (errorCode) {
      case AppErrorTypeEnum.USER_NOT_FOUND:
        res = {
          type: AppErrorTypeEnum.USER_NOT_FOUND,
          httpStatus: HttpStatus.NOT_FOUND,
          errorMessage: 'User not found',
          userMessage: 'Unable to find user with the provided information.',
        };
        break;
      case AppErrorTypeEnum.USER_EXISTS:
        res = {
          type: AppErrorTypeEnum.USER_EXISTS,
          httpStatus: HttpStatus.CONFLICT,
          errorMessage: 'User exists',
          userMessage: 'Username exists',
        };
        break;
      case AppErrorTypeEnum.AUTHENTICATION_FAILED:
        res = {
          type: AppErrorTypeEnum.AUTHENTICATION_FAILED,
          httpStatus: HttpStatus.UNAUTHORIZED,
          errorMessage: 'Authentication failed',
          userMessage: 'Wrong credentials',
        };
        break;
      case AppErrorTypeEnum.INVALID_EMAIL:
        res = {
          type: AppErrorTypeEnum.INVALID_EMAIL,
          httpStatus: HttpStatus.BAD_REQUEST,
          errorMessage: 'Invalid email format',
          userMessage: 'Email is not of valid format',
        };
        break;
      case AppErrorTypeEnum.VALIDATION_FAILED:
        res = {
          type: AppErrorTypeEnum.VALIDATION_FAILED,
          httpStatus: HttpStatus.BAD_REQUEST,
          errorMessage: 'Validation failed',
          userMessage: 'Validation failed',
        };
        break;
      case AppErrorTypeEnum.TRANSACTION_NOT_FOUND:
        res = {
          type: AppErrorTypeEnum.TRANSACTION_NOT_FOUND,
          httpStatus: HttpStatus.BAD_REQUEST,
          errorMessage: 'No Transactions found',
          userMessage: 'No transactions found',
        };
        break;
      case AppErrorTypeEnum.INVALID_SELECTOR_NAME:
        res = {
          type: AppErrorTypeEnum.INVALID_SELECTOR_NAME,
          httpStatus: HttpStatus.BAD_REQUEST,
          errorMessage: 'Invalid selector name given',
          userMessage: 'Invalid selector name given',
        };
    }
    return res;
  }
}

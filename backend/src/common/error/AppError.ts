import {AppErrorTypeEnum} from './AppErrorTypeEnum';
import {IErrorMessage} from './IErrorMessage';
import {HttpStatus} from '@nestjs/common';

export class AppError extends Error {
    public errorCode: AppErrorTypeEnum;
    public httpStatus: number;
    public errorMessage: string;
    public userMessage: string;

    constructor(errorCode: AppErrorTypeEnum) {
        super();
        const errorMessageConfig: IErrorMessage = this.getError(errorCode);
        if(!errorMessageConfig) throw new Error('Unable to find message code error.');

        Error.captureStackTrace(this, super.constructor());
        this.name = this.constructor.name;
        this.httpStatus = errorMessageConfig.httpStatus;
        this.errorCode = errorCode;
        this.errorMessage = errorMessageConfig.errorMessage;
        this.userMessage = errorMessageConfig.userMessage;
    }

    private getError(errorCode: AppErrorTypeEnum): IErrorMessage {
        let res: IErrorMessage;

        switch(errorCode){
            case AppErrorTypeEnum.USER_NOT_FOUND:
                res = {
                    type: AppErrorTypeEnum.USER_NOT_FOUND,
                    httpStatus: HttpStatus.NOT_FOUND,
                    errorMessage: 'User not found',
                    userMessage: 'Unable to find user with the provided information.'
                };
                break;
            case AppErrorTypeEnum.USER_EXISTS:
                res = {
                    type: AppErrorTypeEnum.USER_EXISTS,
                    httpStatus: HttpStatus.UNPROCESSABLE_ENTITY,
                    errorMessage: 'User exists',
                    userMessage: 'Username exists'
                }
                break;
            case AppErrorTypeEnum.AUTHENTICATION_FAILED:
                res = {
                    type: AppErrorTypeEnum.AUTHENTICATION_FAILED,
                    httpStatus: HttpStatus.UNAUTHORIZED,
                    errorMessage: 'Authentication failed',
                    userMessage: 'Wrong credentials'
                }
                break;
            case AppErrorTypeEnum.NO_USERS_IN_DB:
                res = {
                    type: AppErrorTypeEnum.NO_USERS_IN_DB,
                    httpStatus: HttpStatus.NOT_FOUND,
                    errorMessage: 'No users exist in the database',
                    userMessage: 'No users. Create some.'
                }
        }
        return res;
    }
}
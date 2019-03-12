import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { IUserService } from './interfaces/userservice.interface';
import { UserDTO } from './dto/user.dto';
import {AppErrorTypeEnum} from '../../common/error/AppErrorTypeEnum';
import {AppError} from '../../common/error/AppError';
import * as crypto from 'crypto';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class UserService implements IUserService{

    constructor(@InjectModel('User') private readonly userModel : Model<User>) {}

    /** Finds all users in the database */
    public async findAll(): Promise<User[]> {
        const users: User[] = await this.userModel.find().exec();
        return users;
    }

    /** Creates a user in the database */
    public async createUser(user: UserDTO): Promise<User> {
        let existingUser: User;
        existingUser = await this.userModel.findOne({email: user.email}).exec();
        if (existingUser) {
            throw new AppError(AppErrorTypeEnum.USER_EXISTS);
        } else {
            const createdUser =  new this.userModel(user);
            return await createdUser.save();
        }
    }

    /** Finds a single user in the database by an email */
    public async findByEmail(email: string): Promise<User> {
        const existingUser: User = await this.userModel.findOne({email: email}).exec()
        if(existingUser)
        {
            return Promise.resolve(existingUser);
        } else {
            throw new AppError(AppErrorTypeEnum.USER_NOT_FOUND);
        }
    }

    /** Authenticates a user */
    public async authenticateUser(user: UserDTO): Promise<User> {
        const existingUser: User = await this.userModel.findOne({email: user.email}).exec();
        if(existingUser)
        {
            const passHash = await crypto.createHmac('sha256', user.password).digest('hex');
            if (existingUser.password === passHash) {
                return existingUser;
            }
        } else {
            throw new AppError(AppErrorTypeEnum.AUTHENTICATION_FAILED);
        }
    }     
}

import { Injectable } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { IUserService } from './interfaces/IUserService';
import { UserDTO } from './dto/create-user.dto';
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
        if (users.length > 0) {
            return Promise.resolve(users);
        } else {
            throw new AppError(AppErrorTypeEnum.NO_USERS_IN_DB);
        }
    }

    /** Creates a user in the database */
    public async createUser(user: UserDTO): Promise<User> {
        let u: User;
        u = await this.userModel.findOne({email: user.email}).exec();
        if (u) {
            throw new AppError(AppErrorTypeEnum.USER_EXISTS);
        } else {
            const createdUser =  new this.userModel(user);
            return await createdUser.save();
        }
    }

    /** Finds a single user in the database by a username */
    public async findByEmail(email: string): Promise<User> {
        const user: User = await this.userModel.findOne({email: email}).exec()
        if(user)
        {
            return Promise.resolve(user);
        } else {
            throw new AppError(AppErrorTypeEnum.USER_NOT_FOUND);
        }
    }

    /** Authenticates a user */
    public async authenticateUser(user: UserDTO): Promise<User> {
        const u: User = await this.userModel.findOne({email: user.email}).exec();
        if(u)
        {
            const passHash = await crypto.createHmac('sha256', user.password).digest('hex');
            if (u.password === passHash) {
                return u;
            }
        } else {
            throw new AppError(AppErrorTypeEnum.AUTHENTICATION_FAILED);
        }
    }     
}

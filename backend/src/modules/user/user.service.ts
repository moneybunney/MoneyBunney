import { Injectable, UseGuards } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { IUserService } from './interfaces/IUserService';
import { CreateUserDto } from './dto/create-user.dto';
import { MongoRepository, Column, ObjectID } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import {AppErrorTypeEnum} from '../../common/error/AppErrorTypeEnum';
import {AppError} from '../../common/error/AppError';
import * as crypto from 'crypto';

@Injectable()
export class UserService implements IUserService{

    constructor(@InjectRepository(UserEntity) private readonly userRepository : MongoRepository<UserEntity>) {}

    /** Finds all users in the database */
    public async findAll(): Promise<UserEntity[]> {
        const users: UserEntity[] = await this.userRepository.find();
        if (users.length > 0) {
            return Promise.resolve(users);
        } else {
            throw new AppError(AppErrorTypeEnum.NO_USERS_IN_DB);
        }
    }

    /** Creates a user in the database */
    public async createUser(user: CreateUserDto): Promise<UserEntity> {
        let u: UserEntity;
        u = await this.userRepository.findOne({username: user.username});
        if (u) {
            throw new AppError(AppErrorTypeEnum.USER_EXISTS);
        } else {
            u = new UserEntity();
            Object.assign(u, user);
            return await this.userRepository.save(u);
        }
    }

    /** Finds a single user in the database by a username */
    public async findByUsername(username: string): Promise<UserEntity> {
        const user: UserEntity = await this.userRepository.findOne({username: username})
        if(user)
        {
            return Promise.resolve(user);
        } else {
            throw new AppError(AppErrorTypeEnum.USER_NOT_FOUND);
        }
    }

    /** Authenticates a user */
    public async authenticateUser(user: {username: string, password: string}): Promise<UserEntity> {
        const u: UserEntity = await this.userRepository.findOne({username: user.username});
        if(u)
        {
            const passHash = await crypto.createHmac('sha256', user.password).digest('hex');
            if (u.password_hash === passHash) {
                return u;
            }
        } else {
            throw new AppError(AppErrorTypeEnum.AUTHENTICATION_FAILED);
        }
    }     
}

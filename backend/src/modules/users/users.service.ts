import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Users } from './interfaces/users.interface';
import { CreateUsersDto } from './dto/create-users.dto';

@Injectable()
export class UsersService {
    constructor(@InjectModel('Users') private readonly usersModel : Model<Users>) {}

    async create(createUsersDto: CreateUsersDto): Promise<Users> {
        const createdUsers = new this.usersModel(createUsersDto);
        return await createdUsers.save();
    }

    async findAll(): Promise<Users[]> {
        return await this.usersModel.find().exec();
    }

    async findById(id: string): Promise<Users> {
        return await this.usersModel.findById(id).exec();
    }
}
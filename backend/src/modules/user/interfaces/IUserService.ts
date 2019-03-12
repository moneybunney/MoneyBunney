import { CreateUserDto } from '../dto/create-user.dto';
import { UserEntity } from '../user.entity';

export interface IUserService {
    findAll(): Promise<UserEntity[]>;
    createUser(user: CreateUserDto): Promise<UserEntity>;
    authenticateUser(user: {username: string, password: string}): Promise<UserEntity>;
}
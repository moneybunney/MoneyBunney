import { UserDTO } from '../dto/user.dto';
import { User } from './user.interface';

export interface IUserService {
    findAll(): Promise<User[]>;
    createUser(user: UserDTO): Promise<User>;
    authenticateUser(user: UserDTO): Promise<User>;
}
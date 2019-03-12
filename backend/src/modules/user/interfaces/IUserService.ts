import { UserDTO } from '../dto/create-user.dto';
import { User } from '../interfaces/user.interface';

export interface IUserService {
    findAll(): Promise<User[]>;
    createUser(user: UserDTO): Promise<User>;
    authenticateUser(user: UserDTO): Promise<User>;
}
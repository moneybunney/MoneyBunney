import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) {}
    
    async validateUser(user: {username: string, password: string}): Promise<any> {
        return await this.userService.authenticateUser(user);
    }

}
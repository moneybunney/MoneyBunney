import { Injectable } from '@nestjs/common';
import { UserService } from '../users/user.service';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) {}

    async validateUser(token: string): Promise<any> {
        //checks if a token is associated with any user.
        //other validation method may be used.
        return await this.userService.findOneByToken(token);
    }
}
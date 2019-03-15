import { Strategy } from 'passport-http-bearer';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from '../user/interfaces/user.interface';
import { UserDTO } from '../user/dto/user.dto';

@Injectable()
export class HttpStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly authService: AuthService) {
        super();
    }

    /** validate by token, representing a user */
    async validate(token: any) {
        let authObject: UserDTO = null;
        const decoded = Buffer.from(token, 'base64').toString();
        try{
            authObject = JSON.parse(decoded);
            const user: User = await this.authService.validateUser(authObject);
            if(!user){
                throw new UnauthorizedException();
            }
            return user;
        } catch(e) {
            throw new UnauthorizedException();
        }

    }
}
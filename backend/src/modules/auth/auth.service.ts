import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserDTO } from '../user/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validateUser(user: UserDTO): Promise<any> {
    return await this.userService.authenticateUser(user);
  }
}

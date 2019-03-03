import { Module } from '@nestjs/common';
import { AuthService } from "./auth.service";
import { HttpStrategy } from './http.strategy';
import { UserModule } from '../users/user.module';
import { PassportModule } from '@nestjs/passport';

@Module({
    imports: [UserModule],
    providers: [AuthService, HttpStrategy],
})

export class AuthModule {}
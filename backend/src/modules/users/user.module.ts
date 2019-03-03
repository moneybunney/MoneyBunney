import { Module} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserSchema } from './schemas/user.schemas';
import { PassportModule } from '@nestjs/passport';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'User', schema: UserSchema}]),
        //Change default authentication strategy here.
        //Using token bearer strategy.
        PassportModule.register({ defaultStrategy: 'bearer'}),
            ],
    controllers: [UserController],
    providers: [UserService],
    exports: [UserService],
})

export class UserModule {}

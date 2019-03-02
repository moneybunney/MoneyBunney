import { Module} from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { UsersSchema } from './schemas/users.schemas';

@Module({
    imports: [MongooseModule.forFeature([{ name: 'Users', schema: UsersSchema}])],
    controllers: [UsersController],
    providers: [UsersService],
})

export class UsersModule {}

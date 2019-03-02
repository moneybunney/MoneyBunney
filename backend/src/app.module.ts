import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TestModule } from './modules/test/test.module';
import { UserModule } from './modules/users/user.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest'),
    TestModule,
    UserModule,
],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

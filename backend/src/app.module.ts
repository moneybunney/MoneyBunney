import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TestModule } from './modules/test/test.module';
import { TransactionsModule } from './modules/transactions/transactions.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';

const { DB_HOST, DB_PORT, DB_NAME } = process.env;
const DbUri = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`;

@Module({
  imports: [
    MongooseModule.forRoot(DbUri),
    TestModule,
    TransactionsModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

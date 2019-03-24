import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TestModule } from './modules/test/test.module';
import { UserModule } from './modules/user/user.module';
import { AuthModule } from './modules/auth/auth.module';
import { TransactionsModule } from './modules/transactions/transactions.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/nest'),
    TestModule,
    TransactionsModule,
    UserModule,
    AuthModule,
    TransactionsModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

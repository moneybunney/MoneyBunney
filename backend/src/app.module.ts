import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { TestModule } from './modules/test/test.module';
import { TransactionsModule } from './modules/transactions/transactions.module';

@Module({
  imports: [MongooseModule.forRoot('mongodb://localhost/nest'), TestModule, TransactionsModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}

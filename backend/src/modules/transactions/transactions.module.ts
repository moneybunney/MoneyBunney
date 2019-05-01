import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './service/transactions.service';
import { TransactionsSchema } from './schemas/transactions.schema';
import { LoggerModule } from '../logger/logger.module';
import { TransactionQueryService } from './service/transaction.query.service';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Transactions', schema: TransactionsSchema },
    ]),
    LoggerModule,
    UserModule,
  ],
  controllers: [TransactionsController],
  providers: [TransactionsService, TransactionQueryService, UserService],
})
export class TransactionsModule {}

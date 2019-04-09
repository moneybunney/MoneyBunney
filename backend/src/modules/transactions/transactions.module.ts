import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './service/transactions.service';
import { TransactionsSchema } from './schemas/transactions.schema';
import { LoggerModule } from '../logger/logger.module';
import { TransactionQueryService } from './service/transaction.query.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Transactions', schema: TransactionsSchema },
    ]),
    LoggerModule,
  ],
  controllers: [TransactionsController],
  providers: [TransactionsService, TransactionQueryService],
})
export class TransactionsModule {}

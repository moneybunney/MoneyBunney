import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './service/transactions.service';
import { CategoryService } from './service/category.service';
import { TransactionsSchema } from './schemas/transactions.schema';
import { CategorySchema } from './schemas/category.schema';
import { LoggerModule } from '../logger/logger.module';
import { TransactionQueryService } from './service/transaction-query.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Transactions', schema: TransactionsSchema },
    ]),
    LoggerModule,
    MongooseModule.forFeature([{ name: 'Categories', schema: CategorySchema }]),
  ],
  controllers: [TransactionsController],
  providers: [TransactionsService, TransactionQueryService, CategoryService],
})
export class TransactionsModule {}

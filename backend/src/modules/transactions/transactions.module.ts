import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionsController } from './transactions.controller';
import { TransactionsService } from './transactions.service';
import { TransactionsSchema } from './schemas/transactions.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Transactions', schema: TransactionsSchema }])],
  controllers: [TransactionsController],
  providers: [TransactionsService],
})
export class TransactionsModule {}

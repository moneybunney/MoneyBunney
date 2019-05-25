import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BudgetsController } from './budgets.controller';
import { BudgetsService } from './budgets.service';
import { BudgetsSchema } from './schemas/budgets.schema';
import { LoggerModule } from '../logger/logger.module';
import { TransactionsSchema } from '../transactions/schemas/transactions.schema';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { TransactionsModule } from '../transactions/transactions.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Budgets', schema: BudgetsSchema },
      { name: 'Transactions', schema: TransactionsSchema },
    ]),
    LoggerModule,
    UserModule,
    TransactionsModule,
  ],
  controllers: [BudgetsController],
  providers: [BudgetsService, UserService],
})
export class BudgetsModule {}

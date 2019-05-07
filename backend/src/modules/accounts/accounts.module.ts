import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './service/accounts.service';
import { AccountsSchema } from './schemas/accounts.schema';
import { LoggerModule } from '../logger/logger.module';
import { TransactionsSchema } from '../transactions/schemas/transactions.schema';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { TransactionsModule } from '../transactions/transactions.module';
import { TransactionQueryService } from '../transactions/service/transaction.query.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Accounts', schema: AccountsSchema },
      { name: 'Transactions', schema: TransactionsSchema },
    ]),
    LoggerModule,
    UserModule,
    TransactionsModule,
  ],
  controllers: [AccountsController],
  providers: [AccountsService, UserService, TransactionQueryService],
})
export class AccountsModule {}

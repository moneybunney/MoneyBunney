import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AccountsController } from './accounts.controller';
import { AccountsService } from './service/accounts.service';
import { AccountsSchema } from './schemas/accounts.schema';
import { LoggerModule } from '../logger/logger.module';
import { AccountQueryService } from './service/account-query.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Accounts', schema: AccountsSchema }]),
    LoggerModule,
  ],
  controllers: [AccountsController],
  providers: [AccountsService, AccountQueryService],
})
export class AccountsModule {}

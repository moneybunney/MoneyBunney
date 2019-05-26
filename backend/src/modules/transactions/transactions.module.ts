import { Module, forwardRef } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TransactionsController } from './transactions.controller';
import { CategoriesController } from './categories.controller';
import { TransactionsService } from './service/transactions.service';
import { CategoryService } from './service/category.service';
import { TransactionsSchema } from './schemas/transactions.schema';
import { CategorySchema } from './schemas/category.schema';
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
    forwardRef(() => UserModule),
    MongooseModule.forFeature([{ name: 'Categories', schema: CategorySchema }]),
  ],
  controllers: [TransactionsController, CategoriesController],
  providers: [
    TransactionsService,
    TransactionQueryService,
    CategoryService,
    UserService,
  ],
  exports: [TransactionQueryService],
})
export class TransactionsModule {}

import { Model } from 'mongoose';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Accounts } from '../interfaces/accounts.interface';
import { Transactions } from '../../transactions/interfaces/transactions.interface';
import { AccountDTO } from '../dto/account.dto';
import { Logger } from '../../logger/logger.service';
import { TransactionQueryService } from '../../transactions/service/transaction.query.service';
import { QueryDTO } from '../../../../../shared/query.dto';

interface IAccountDTO {
  Name: string;
  Balance: number;
  _id: string;
}

@Injectable()
export class AccountsService {
  constructor(
    @InjectModel('Accounts')
    private readonly accountModel: Model<Accounts>,
    @InjectModel('Transactions')
    private readonly transactionModel: Model<Transactions>,
    private readonly logger: Logger,
    private readonly transactionQueryService: TransactionQueryService,
  ) {}

  async create(AccountDto: AccountDTO, UserId: string): Promise<Accounts> {
    const createdAccount = new this.accountModel({
      ...AccountDto,
      UserId,
    });
    return await createdAccount.save();
  }

  async remove(id: string): Promise<any> {
    try {
      await this.transactionModel.deleteMany({ Account: id });
      await this.accountModel
        .findById(id)
        .remove()
        .exec();
    } catch (e) {
      this.logger.log(e.toString());
      throw new BadRequestException('Requested account was not found!');
    }
  }

  async createAccountToTransactionBalanceMap(
    UserId: string,
  ): Promise<Map<string, number>> {
    const balanceByAccount = await this.transactionModel
      .aggregate([
        {
          $match: { UserId },
        },
        {
          $group: {
            _id: '$Account',
            Balance: { $sum: '$Amount' },
          },
        },
      ])
      .exec();

    return balanceByAccount.reduce((acc, current) => {
      return {
        [current._id]: current.Balance,
        ...acc,
      };
    }, {});
  }

  async findAccounts(UserId: string): Promise<IAccountDTO[]> {
    const accounts = await this.accountModel.find({ UserId }).exec();

    const accountToBalanceMap = await this.createAccountToTransactionBalanceMap(
      UserId,
    );

    return accounts.map(account => {
      return {
        Name: account.Name,
        Balance:
          (accountToBalanceMap[account._id]
            ? accountToBalanceMap[account._id]
            : 0) + account.InitialBalance,
        _id: account._id,
      };
    });
  }
}

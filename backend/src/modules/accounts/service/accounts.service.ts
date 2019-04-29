import { Model } from 'mongoose';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Accounts } from '../interfaces/accounts.interface';
import { AccountDTO } from '../dto/account.dto';
import { Logger } from '../../logger/logger.service';

@Injectable()
export class AccountsService {
  constructor(
    @InjectModel('Accounts')
    private readonly accountModel: Model<Accounts>,
    private readonly logger: Logger,
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
      return await this.accountModel
        .findById(id)
        .remove()
        .exec();
    } catch (e) {
      this.logger.log(e.toString());
      throw new BadRequestException('Requested account was not found!');
    }
  }

  async findAccounts(UserId: string): Promise<Accounts[]> {
    return await this.accountModel.find({ UserId }).exec();
  }
}

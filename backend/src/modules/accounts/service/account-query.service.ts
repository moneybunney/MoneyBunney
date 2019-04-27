import { Model } from 'mongoose';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Accounts } from '../interfaces/accounts.interface';
import { Logger } from '../../logger/logger.service';
import { QueryDTO } from '../../../../../shared/query.dto';
import { AccountDTO } from '../dto/account.dto';

@Injectable()
export class AccountQueryService {
  constructor(
    @InjectModel('Accounts')
    private readonly accountModel: Model<Accounts>,
    private readonly logger: Logger,
  ) {}

  async query(queryRequest: QueryDTO): Promise<AccountDTO[]> {
    const currentQuery = this.accountModel.find();
    this.logger.log('Query object received:');
    this.logger.log(queryRequest as any);
    if (!queryRequest) {
      return [];
    }
    return currentQuery.exec().catch(e => {
      if (typeof e.message === 'string') {
        throw new BadRequestException(e.message);
      } else {
        throw new BadRequestException(JSON.stringify(e));
      }
    });
  }
}

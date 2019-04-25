import { Model } from 'mongoose';
import { Injectable, BadRequestException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Accounts } from '../interfaces/accounts.interface';
import { Logger } from '../../logger/logger.service';
import { QueryDTO } from '../../../../../shared/query.dto';
import { Selector } from './selectors/selector';
import { AccountDTO } from '../dto/account.dto';
import { SelectorFactory } from './selector-repository';
import { isTemplateElement } from '@babel/types';

@Injectable()
export class AccountQueryService {
  private readonly selectorFactory: SelectorFactory<Accounts>;
  constructor(
    @InjectModel('Accounts')
    private readonly accountModel: Model<Accounts>,
    private readonly logger: Logger,
  ) {
    this.selectorFactory = new SelectorFactory<Accounts>();
  }

  async query(queryRequest: QueryDTO): Promise<AccountDTO[]> {
    const currentQuery = this.accountModel.find();
    this.logger.log('Query object received:');
    this.logger.log(queryRequest as any);
    if (
      !queryRequest ||
      !queryRequest.selectors ||
      queryRequest.selectors.length === 0
    ) {
      return [];
    }
    queryRequest.selectors.forEach(selectorDTO => {
      const selectorImpl = this.resolveSelector(selectorDTO.Name);
      selectorImpl.ApplySelectorDTO(selectorDTO, currentQuery);
    });
    return currentQuery.exec().catch(e => {
      if (typeof e.message === 'string') {
        throw new BadRequestException(e.message);
      } else {
        throw new BadRequestException(JSON.stringify(e));
      }
    });
  }

  resolveSelector = (name: string): Selector<Accounts> => {
    return this.selectorFactory.CreateSelector(name);
  };
}

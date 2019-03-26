import { DocumentQuery } from 'mongoose';
import { Transactions } from '../../interfaces/transactions.interface';
import { SelectorDTO } from '../../dto/selector.dto';
import { IdSelector } from './id.selector';

describe('IdSelector', () => {
  let transactionsQueryMock: DocumentQuery<Transactions[], Transactions, {}>;
  it('should do nothing with the query', async () => {
    const selectorDTO: SelectorDTO = {
      Name: 'id',
      Value: '132',
    };
    const selector = new IdSelector<Transactions>();
    transactionsQueryMock = jest.fn(() => ({
      where: jest.fn(() => this),
    })) as any;
    const ret = selector.ApplySelectorDTO(selectorDTO, transactionsQueryMock);
    expect(transactionsQueryMock.where).toBeCalledWith('_id', selectorDTO.Value);
    expect(ret).toEqual(transactionsQueryMock);
  });
});

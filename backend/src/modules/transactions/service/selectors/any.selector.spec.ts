import { AnySelector } from './any.selector';
import { DocumentQuery } from 'mongoose';
import { Transactions } from '../../interfaces/transactions.interface';
import { SelectorDTO } from '../../dto/selector.dto';

describe('AnySelector', () => {
  let transactionsQueryMock: DocumentQuery<Transactions[], Transactions, {}>;
  it('should do nothing with the query', async () => {
    const selectorDTO: SelectorDTO = {
      Name: 'any',
    };
    const selector = new AnySelector<Transactions>();
    transactionsQueryMock = jest.fn() as any;
    const ret = selector.ApplySelectorDTO(selectorDTO, transactionsQueryMock);
    expect(ret).toEqual(transactionsQueryMock);
  });
});

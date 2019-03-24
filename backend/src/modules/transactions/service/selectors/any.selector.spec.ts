import { AnySelector } from './any.selector';
import { DocumentQuery } from 'mongoose';
import { Transactions } from '../../interfaces/transactions.interface';
import { findAddedNonNullDirectiveArgs } from 'graphql/utilities/findBreakingChanges';

describe('AnySelector', () => {
  let transactionsQueryMock: DocumentQuery<Transactions[], Transactions, {}>;
  it('should do nothing with the query', async () => {
    const selector = new AnySelector<Transactions>();
    transactionsQueryMock = jest.fn() as any;
    const ret = selector.ApplySelector(transactionsQueryMock);
    expect(ret).toEqual(transactionsQueryMock);
  });
});

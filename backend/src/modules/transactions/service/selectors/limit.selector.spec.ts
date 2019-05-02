import { DocumentQuery } from 'mongoose';
import { Transactions } from '../../interfaces/transactions.interface';
import { SelectorDTO } from '../../../../../../shared/selector.dto';
import { LimitSelector } from './limit.selector';

describe('SortSelector', () => {
  let transactionsQueryMock: DocumentQuery<Transactions[], Transactions, {}>;
  it("should call 'limit' with the DTO value", async () => {
    transactionsQueryMock = {
      limit: jest.fn(() => transactionsQueryMock),
    } as any;
    const selectorDTO: SelectorDTO = {
      Name: 'limit',
      Payload: 10,
    };
    const selector = new LimitSelector<Transactions>();
    const ret = selector.ApplySelectorDTO(selectorDTO, transactionsQueryMock);
    expect(transactionsQueryMock.limit).toBeCalledWith(selectorDTO.Payload);
    expect(ret).toEqual(transactionsQueryMock);
  });

  it('should error with invalid value', async () => {
    transactionsQueryMock = {
      limit: jest.fn(() => transactionsQueryMock),
    } as any;
    const selectorDTO: SelectorDTO = {
      Name: 'limit',
      Payload: -1,
    };
    const selector = new LimitSelector<Transactions>();
    expect(() => {
      selector.ApplySelectorDTO(selectorDTO, transactionsQueryMock);
    }).toThrow();
  });
});

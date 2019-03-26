import { DocumentQuery } from 'mongoose';
import { Transactions } from '../../interfaces/transactions.interface';
import { SelectorDTO } from '../../dto/selector.dto';
import { IdSelector } from './id.selector';

describe('IdSelector', () => {
  let transactionsQueryMock: DocumentQuery<Transactions[], Transactions, {}>;
  it('should call \'where\' with the DTO values', async () => {
    const selectorDTO: SelectorDTO = {
      Name: 'id',
      Value: '132',
    };
    const selector = new IdSelector<Transactions>();
    transactionsQueryMock = {
      where: jest.fn(() => transactionsQueryMock),
    } as any;
    const ret = selector.ApplySelectorDTO(selectorDTO, transactionsQueryMock);
    expect(transactionsQueryMock.where).toBeCalledWith('_id', selectorDTO.Value);
    expect(ret).toEqual(transactionsQueryMock);
  });
});

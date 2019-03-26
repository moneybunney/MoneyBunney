import { DocumentQuery } from 'mongoose';
import { Transactions } from '../../interfaces/transactions.interface';
import { SelectorDTO } from '../../dto/selector.dto';
import { SortSelector } from './sort.selector';

describe('SortSelector', () => {
    let transactionsQueryMock: DocumentQuery<Transactions[], Transactions, {}>;
    it('should call \'sort\' with the DTO values', async () => {
        transactionsQueryMock = {
            sort: jest.fn(() => transactionsQueryMock),
        } as any;
        const selectorDTO: SelectorDTO = {
        Name: 'sort',
        Key: 'Date',
        Value: 1,
        };

        const selector = new SortSelector<Transactions>();
        const ret = selector.ApplySelectorDTO(selectorDTO, transactionsQueryMock);
        const sortObject: any = {};
        sortObject[selectorDTO.Key] = selectorDTO.Value;
        expect(transactionsQueryMock.sort).toBeCalledWith(sortObject);
        expect(ret).toEqual(transactionsQueryMock);
  });

    it('should error with invalid key', async () => {
        transactionsQueryMock = {
            sort: jest.fn(() => transactionsQueryMock),
        } as any;
        const selectorDTO: SelectorDTO = {
        Name: 'sort',
        Key: 'Category',
        Value: 1,
        };
        const selector = new SortSelector<Transactions>();
        expect(() => selector.ApplySelectorDTO(selectorDTO, transactionsQueryMock)).toThrow();
  });

    it('should error with invalid value', async () => {
        transactionsQueryMock = {
            sort: jest.fn(() => transactionsQueryMock),
        } as any;
        const selectorDTO: SelectorDTO = {
            Name: 'sort',
            Key: 'Date',
            Value: '1',
        };
        const selector = new SortSelector<Transactions>();
        expect(() => selector.ApplySelectorDTO(selectorDTO, transactionsQueryMock)).toThrow();
    });
});

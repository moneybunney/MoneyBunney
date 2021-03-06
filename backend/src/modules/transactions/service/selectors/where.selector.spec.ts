import { DocumentQuery } from 'mongoose';
import { Transactions } from '../../interfaces/transactions.interface';
import { SelectorDTO } from '../../../../../../shared/selector.dto';
import { WhereSelector } from './where.selector';

describe('WhereSelector', () => {
  let transactionsQueryMock: DocumentQuery<Transactions[], Transactions, {}>;
  beforeEach(() => {
    transactionsQueryMock = {
      where: jest.fn(() => transactionsQueryMock),
      lt: jest.fn(() => transactionsQueryMock),
      lte: jest.fn(() => transactionsQueryMock),
      gt: jest.fn(() => transactionsQueryMock),
      gte: jest.fn(() => transactionsQueryMock),
    } as any;
  });

  it("should call 'where' with the DTO values", async () => {
    const selectorDTO: SelectorDTO = {
      Name: 'where',
      Key: 'Amount',
      Payload: {
        Relationship: 'eq',
        Value: '10',
      },
    };

    const selector = new WhereSelector<Transactions>();
    const ret = selector.ApplySelectorDTO(selectorDTO, transactionsQueryMock);
    expect(transactionsQueryMock.where).toBeCalledWith(
      selectorDTO.Key,
      selectorDTO.Payload.Value,
    );
    expect(ret).toEqual(transactionsQueryMock);
  });

  it("should call 'in' with the DTO values", async () => {
    const selectorDTO: SelectorDTO = {
      Name: 'where',
      Key: 'Tags',
      Payload: {
        Relationship: 'lt',
        Value: ['tag1', 'tag2'],
      },
    };

    const selector = new WhereSelector<Transactions>();
    const ret = selector.ApplySelectorDTO(selectorDTO, transactionsQueryMock);
    expect(transactionsQueryMock.lt).toBeCalledWith(
      selectorDTO.Key,
      selectorDTO.Payload.Value,
    );
    expect(ret).toEqual(transactionsQueryMock);
  });

  it("should call 'lt' with the DTO values", async () => {
    const selectorDTO: SelectorDTO = {
      Name: 'where',
      Key: 'Amount',
      Payload: {
        Relationship: 'lt',
        Value: '10',
      },
    };

    const selector = new WhereSelector<Transactions>();
    const ret = selector.ApplySelectorDTO(selectorDTO, transactionsQueryMock);
    expect(transactionsQueryMock.lt).toBeCalledWith(
      selectorDTO.Key,
      selectorDTO.Payload.Value,
    );
    expect(ret).toEqual(transactionsQueryMock);
  });

  it("should call 'gte' with the DTO values", async () => {
    const selectorDTO: SelectorDTO = {
      Name: 'where',
      Key: 'Amount',
      Payload: {
        Relationship: 'gte',
        Value: '10',
      },
    };

    const selector = new WhereSelector<Transactions>();
    const ret = selector.ApplySelectorDTO(selectorDTO, transactionsQueryMock);
    expect(transactionsQueryMock.gte).toBeCalledWith(
      selectorDTO.Key,
      selectorDTO.Payload.Value,
    );
    expect(ret).toEqual(transactionsQueryMock);
  });

  it('should error with wrong operator ', async () => {
    const selectorDTO: SelectorDTO = {
      Name: 'where',
      Key: 'Amount',
      Payload: {
        Relationship: 'gtr',
        Value: '10',
      },
    };

    const selector = new WhereSelector<Transactions>();
    expect(() =>
      selector.ApplySelectorDTO(selectorDTO, transactionsQueryMock),
    ).toThrow();
  });

  it('should error with wrong key', async () => {
    transactionsQueryMock = {
      sort: jest.fn(() => transactionsQueryMock),
    } as any;
    const selectorDTO: SelectorDTO = {
      Name: 'where',
      Payload: {
        Relationship: 'eq',
        Value: '10',
      },
    };

    const selector = new WhereSelector<Transactions>();
    expect(() =>
      selector.ApplySelectorDTO(selectorDTO, transactionsQueryMock),
    ).toThrow();
  });

  it('should error with wrong relationship', async () => {
    transactionsQueryMock = {
      sort: jest.fn(() => transactionsQueryMock),
    } as any;
    const selectorDTO: SelectorDTO = {
      Name: 'where',
      Key: 'Amount',
      Payload: {
        Value: '10',
      },
    };

    const selector = new WhereSelector<Transactions>();
    expect(() =>
      selector.ApplySelectorDTO(selectorDTO, transactionsQueryMock),
    ).toThrow();
  });

  it('should error with malformed value', async () => {
    transactionsQueryMock = {
      sort: jest.fn(() => transactionsQueryMock),
    } as any;
    const selectorDTO: SelectorDTO = {
      Name: 'where',
      Key: 'Amount',
      Payload: {
        Value: { test: 'I love unit tests!' },
      },
    };

    const selector = new WhereSelector<Transactions>();
    expect(() =>
      selector.ApplySelectorDTO(selectorDTO, transactionsQueryMock),
    ).toThrow();
  });
});

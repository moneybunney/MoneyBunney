import { BalanceResponseObjectDTO } from "../../../../shared/aggregator-responses/balance.response.dto";
import { SumResponseObjectDTO } from "../../../../shared/aggregator-responses/sum.response.dto";
import { AggregatorDTO } from "../../../../shared/aggregator.dto";
import { QueryDTO } from "../../../../shared/query.dto";
import { SelectorDTO } from "../../../../shared/selector.dto";
import { ITransaction } from "../../Models/TransactionModel";
import { getPost } from "../Http";

export class TransactionQuery {
  private selectors: SelectorDTO[] = [];
  private aggregator?: AggregatorDTO;
  private signal: AbortSignal | undefined;

  constructor(signal?: AbortSignal) {
    this.signal = signal;
  }

  public any = (): TransactionQuery => {
    const anySelector = (): SelectorDTO => ({
      Name: "any"
    });
    this.selectors.push(anySelector());
    return this;
  };

  public id = (id: string): TransactionQuery => {
    const idSelector = (): SelectorDTO => ({
      Name: "id",
      Payload: id
    });
    this.selectors.push(idSelector());
    return this;
  };

  public limit = (amount: number): TransactionQuery => {
    const limitSelector = (): SelectorDTO => ({
      Name: "limit",
      Payload: amount
    });
    this.selectors.push(limitSelector());
    return this;
  };

  /**
   * @param field - The field to sort by
   * @param order 1 :ascending, -1 :descending
   */
  public sort = (field: string, order: number): TransactionQuery => {
    const sortSelector = (): SelectorDTO => ({
      Name: "sort",
      Key: field,
      Payload: order
    });
    this.selectors.push(sortSelector());
    return this;
  };

  public equals = (field: string, value: any): TransactionQuery => {
    this.selectors.push(this.whereSelector(field, value, "eq"));
    return this;
  };

  public gt = (field: string, value: any): TransactionQuery => {
    this.selectors.push(this.whereSelector(field, value, "gt"));
    return this;
  };

  public gte = (field: string, value: any): TransactionQuery => {
    this.selectors.push(this.whereSelector(field, value, "gte"));
    return this;
  };

  public lt = (field: string, value: any): TransactionQuery => {
    this.selectors.push(this.whereSelector(field, value, "lt"));
    return this;
  };

  public lte = (field: string, value: any): TransactionQuery => {
    this.selectors.push(this.whereSelector(field, value, "lte"));
    return this;
  };

  public in = (field: string, value: any): TransactionQuery => {
    this.selectors.push(this.whereSelector(field, value, "in"));
    return this;
  };

  public getQueryDTO = (): QueryDTO => {
    if (this.selectors.length === 0) {
      this.any();
    }
    if (!this.aggregator) {
      this.aggregator = { Name: "list" };
    }
    return {
      selectors: this.selectors,
      aggregator: this.aggregator as AggregatorDTO
    };
  };

  public execute = async () => {
    const queryDTO = this.getQueryDTO();
    const response = await getPost(
      "/api/transactions/query",
      undefined,
      queryDTO,
      { signal: this.signal }
    );
    if (response.status !== 200) {
      throw new Error("Something went wrong:" + JSON.stringify(response));
    }
    return this.parseResponse(queryDTO, response);
  };

  public sum = async (
    distinctColumn: string
  ): Promise<SumResponseObjectDTO[]> => {
    this.aggregator = {
      Name: "sum",
      Payload: {
        distinctColumn
      }
    };
    return this.execute();
  };

  public balance = async (
    key: string,
    take: number
  ): Promise<BalanceResponseObjectDTO[]> => {
    this.aggregator = {
      Name: "balance",
      Payload: {
        take,
        key
      }
    };
    return this.execute();
  };

  private whereSelector = (
    field: string,
    value: any,
    relationship: string
  ): SelectorDTO => ({
    Name: "where",
    Key: field,
    Payload: {
      Relationship: relationship,
      Value: value
    }
  });

  private parseResponse = (queryDTO: QueryDTO, response: any): any => {
    switch (queryDTO.aggregator.Name) {
      case "list":
        return this.parseListResponse(response);
      case "sum":
        return this.parseSumResponse(response);
      case "balance":
        return this.parseBalanceResponse(response);
    }
  };

  private parseListResponse(response: any): ITransaction[] {
    return response.json().then((data: any) => {
      this.throwIfNotArray(data);
      const dtoArray = data as any[];
      return dtoArray.map(
        (element): ITransaction => {
          this.throwIfNotString(element.Date);
          this.throwIfNotString(element.Account);
          this.throwIfNotNumber(element.Category);
          this.throwIfNotNumber(element.Amount);
          this.throwIfNotString(element.Description);

          if (!Array.isArray(element.Tags)) {
            throw new Error("Response Tags was not an array!");
          }

          return {
            date: element.Date,
            account: element.Account,
            category: element.Category,
            amount: element.Amount,
            description: element.Description,
            tags: element.Tags,
            id: element._id
          };
        }
      );
    });
  }

  private parseSumResponse = (response: any): SumResponseObjectDTO[] => {
    return response.json().then((data: any) => {
      this.throwIfNotArray(data);
      const dtoArray = data as any[];
      return dtoArray.map(
        (element: SumResponseObjectDTO): SumResponseObjectDTO => {
          this.throwIfNotString(element.Key);
          this.throwIfNotNumber(element.Sum);

          return {
            Key: element.Key,
            Sum: element.Sum
          };
        }
      );
    });
  };

  private parseBalanceResponse = (
    response: any
  ): BalanceResponseObjectDTO[] => {
    return response.json().then((data: any) => {
      this.throwIfNotArray(data);
      const dtoArray = data as any[];
      return dtoArray.map(
        (element: BalanceResponseObjectDTO): BalanceResponseObjectDTO => {
          this.throwIfNotString(element.Key);
          this.throwIfNotNumber(element.Balance);

          return {
            Key: element.Key,
            Balance: element.Balance
          };
        }
      );
    });
  };

  private throwIfNotArray = (value: any) => {
    if (!Array.isArray(value)) {
      throw new Error("Expected array, got:" + JSON.stringify(value));
    }
  };

  private throwIfNotString = (value: any) => {
    if (typeof value !== "string") {
      throw new Error("Expected string, but got:" + JSON.stringify(value));
    }
  };

  private throwIfNotNumber = (value: any) => {
    if (typeof value === "string" && !isNaN(parseInt(value as string, 10))) {
      return;
    } else if (typeof value === "number") {
      return;
    }
    throw new Error("Excepted number, but got:" + JSON.stringify(value));
  };
}

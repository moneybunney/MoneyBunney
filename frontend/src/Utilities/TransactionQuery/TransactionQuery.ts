import { QueryDTO } from "../../../../shared/query.dto";
import { SelectorDTO } from "../../../../shared/selector.dto";
import { ITransaction } from "../../Models/TransactionModel";
import { getPost } from "../Http";

export class TransactionQuery {
  private selectors: SelectorDTO[] = [];

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
      Value: id
    });
    this.selectors.push(idSelector());
    return this;
  };

  public limit = (amount: number): TransactionQuery => {
    const limitSelector = (): SelectorDTO => ({
      Name: "limit",
      Value: amount
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
      Value: order
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
    const makeQueryDTO = (): QueryDTO => ({
      selectors: this.selectors,
      aggregator: "not-implemented"
    });
    return makeQueryDTO();
  };

  public execute = async () => {
    const queryDTO = this.getQueryDTO();
    const response = await getPost(
      "/api/transactions/query",
      undefined,
      queryDTO
    );
    if (response.status === 200) {
      return response.json().then(data => {
        if (!Array.isArray(data)) {
          throw new Error("Response was not an array!");
        }
        const dtoArray = data as any[];
        return dtoArray.map(
          (element): ITransaction => {
            this.throwIfNotString(element.Date);
            this.throwIfNotNumber(element.Account);
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
    } else {
      throw new Error("Something went wrong");
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

  private whereSelector = (
    field: string,
    value: any,
    relationship: string
  ): SelectorDTO => ({
    Name: "where",
    Key: field,
    Value: {
      Relationship: relationship,
      Value: value
    }
  });
}

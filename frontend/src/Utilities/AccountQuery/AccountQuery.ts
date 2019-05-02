import { IAccount } from "../../Models/AccountModel";
import { get } from "../Http";

export class AccountQuery {
  public execute = async () => {
    const response = await get("/api/accounts");
    if (response.status !== 200) {
      throw new Error("Something went wrong:" + JSON.stringify(response));
    }
    return this.parseListResponse(response);
  };
  private parseListResponse(response: any): IAccount[] {
    return response.json().then((data: any) => {
      this.throwIfNotArray(data);
      const dtoArray = data as any[];
      return dtoArray.map(
        (element): IAccount => {
          this.throwIfNotString(element.Name);
          this.throwIfNotNumber(element.Balance);

          return {
            name: element.Name,
            balance: element.Balance,
            id: element._id
          };
        }
      );
    });
  }

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

import { IBudget } from "../../Models/BudgetModel";
import { get } from "../Http";

export class BudgetQuery {
  public execute = async () => {
    const response = await get("/api/budgets");
    if (response.status !== 200) {
      throw new Error("Something went wrong:" + JSON.stringify(response));
    }
    return this.parseListResponse(response);
  };
  private parseListResponse(response: any): IBudget[] {
    return response.json().then((data: any) => {
      this.throwIfNotArray(data);
      const dtoArray = data as any[];
      return dtoArray.map(
        (element): IBudget => {
          this.throwIfNotString(element.Category);
          this.throwIfNotString(element.StartDate);
          this.throwIfNotString(element.EndDate);
          this.throwIfNotNumber(element.Amount);
          this.throwIfNotNumber(element.CurrentAmount);

          return {
            category: element.Category,
            startDate: element.StartDate,
            endDate: element.EndDate,
            amount: element.Amount,
            currentAmount: element.CurrentAmount,
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

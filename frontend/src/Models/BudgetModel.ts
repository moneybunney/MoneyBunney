import { ICategory, getNowDate } from "./TransactionModel";

export interface IBudget {
  id: string;
  category: string;
  startDate: string;
  endDate: string;
  amount: number;
  currentAmount: number;
}

export const createEmptyBudget = (
  overrides: Partial<IBudgetCreateDTO>
): IBudgetCreateDTO => ({
  Category: "-1",
  StartDate: getNowDate(),
  EndDate: getNowDate(),
  Amount: NaN,
  ...overrides
});

export interface IBudgetCreateDTO {
  Category: string;
  StartDate: string;
  EndDate: string;
  Amount: number;
}

export const getCategoryName = (id: string, categories: ICategory[]) => {
  const categoriesWithId = categories.filter(category => category.id === id);
  return categoriesWithId.length !== 0 ? categoriesWithId[0].text : "";
};

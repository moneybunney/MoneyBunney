import { ICategory, getNowDate } from "./TransactionModel";

export interface IBudget {
  id: string;
  category: string;
  startDate: string;
  endDate: string;
  amount: number;
  currentAmount: number;
}

export const createEmptyBudget = (overrides: Partial<IBudget>): IBudget => ({
  category: "-1",
  startDate: getNowDate(),
  endDate: getNowDate(),
  id: "",
  amount: NaN,
  currentAmount: NaN,
  ...overrides
});

export const getCategoryName = (id: string, categories: ICategory[]) => {
  const categoriesWithId = categories.filter(category => category.id === id);
  return categoriesWithId.length !== 0 ? categoriesWithId[0].text : "";
};

import { IAccountCreateDTO } from "../Models/AccountModel";
import { IFilters } from "../Models/TransactionFilterModel";
import { ICategory, ITransaction } from "../Models/TransactionModel";
import { IBudgetCreateDTO } from "../Models/BudgetModel";
import { AccountQuery } from "./AccountQuery/AccountQuery";
import { get, post } from "./Http";
import { TransactionQuery } from "./TransactionQuery/TransactionQuery";
import { BudgetQuery } from "./BudgetQuery/BudgetQuery";

interface ILoginData {
  email: string;
  password: string;
}

export const postLogin = (data: ILoginData) =>
  post("/api/user/login", data).then(response => {
    if (response.status === 200) {
      return response.body;
    } else {
      throw new Error("Login unsuccessful");
    }
  });

export const postRegister = (data: ILoginData) =>
  post("/api/user", data).then(response => {
    if (response.status === 201) {
      return response.body;
    } else {
      throw new Error("Email is already used");
    }
  });

export const postTransaction = async (data: ITransaction) => {
  const DTO = {
    Date: new Date(data.date).toISOString(),
    Account: data.account.toString(),
    Category: data.category,
    Amount: Number(data.amount),
    Description: data.description,
    Tags: data.tags
  };
  const response = await post("/api/transactions", DTO);
  if (response.status === 201) {
    return response.body;
  } else {
    throw new Error("Something went wrong");
  }
};

const applyFilters = (
  initialQuery: TransactionQuery,
  filters: IFilters
): TransactionQuery => {
  let query = initialQuery;

  if (filters.accounts.length !== 0) {
    query = query.in("Account", filters.accounts);
  }

  if (filters.categories.length !== 0) {
    query = query.in("Category", filters.categories);
  }

  if (filters.tags.length !== 0) {
    query = query.in("Tags", filters.tags);
  }

  if (filters.transactionTypes.length !== 0) {
    if (
      !(
        filters.transactionTypes.includes("Expense") &&
        filters.transactionTypes.includes("Income")
      )
    ) {
      if (filters.transactionTypes.includes("Income")) {
        query = query.gt("Amount", 0);
      }

      if (filters.transactionTypes.includes("Expense")) {
        query = query.lt("Amount", 0);
      }
    }

    // TODO: Support for Transfers
  }

  return query;
};

export const getTransactionListChunk = async (
  startingDate: Date,
  count: number,
  filters: IFilters,
  signal: AbortSignal
) => {
  let query = new TransactionQuery(signal)
    .sort("Date", -1)
    .lt("Date", startingDate.toISOString())
    .limit(count);

  query = applyFilters(query, filters);

  return query.execute();
};

export const postAccount = async (DTO: IAccountCreateDTO) => {
  const response = await post("/api/accounts", DTO);
  if (response.status === 201) {
    return response.body;
  } else {
    throw new Error("Something went wrong");
  }
};

export const getAccounts = async () => {
  return new AccountQuery().execute();
};

export const postBudget = async (DTO: IBudgetCreateDTO) => {
  const response = await post("/api/budgets", DTO);
  if (response.status === 201) {
    return response.body;
  } else {
    throw new Error("Something went wrong");
  }
};

export const getBudgets = async () => {
  return new BudgetQuery().execute();
};

export const getExpenseByCategoryData = async () => {
  return new TransactionQuery().lt("Amount", 0).sum("Category");
};

export const getExpenseByDateRange = async (from: Date, to: Date) => {
  return new TransactionQuery()
    .gte("Date", from)
    .lt("Date", to)
    .lt("Amount", 0)
    .sum("Account");
};

export const getIncomeByDateRange = async (from: Date, to: Date) => {
  return new TransactionQuery()
    .gte("Date", from)
    .lt("Date", to)
    .gt("Amount", 0)
    .sum("Account");
};

export const getCategories = async (): Promise<ICategory[]> => {
  const response = await get("/api/transactions/categories");
  if (response.status === 200) {
    const jsonData = await response.json();
    return jsonData.map((datum: any) => ({
      id: datum._id,
      text: datum.Name,
      icon: datum.Icon
    }));
  } else {
    throw new Error("Something went wrong when fetching categories");
  }
};

export const getTags = async (): Promise<string[]> => {
  const response = await get("/api/transactions/tags");
  if (response.status === 200) {
    return response.json();
  } else {
    throw new Error("Something went wrong when fetching tags");
  }
};

export const getNetWorth = async (): Promise<number> => {
  const accounts = await getAccounts();

  return accounts
    .map(acc => acc.balance)
    .reduce((total, balance) => total + balance);
};

export const getExpensesToday = async (): Promise<number> => {
  const todayMidnight = new Date().setHours(0, 0, 0, 0);

  const transactions: ITransaction[] = await new TransactionQuery()
    .gte("Date", todayMidnight)
    .lt("Amount", 0)
    .execute();

  return transactions
    .map(transaction => transaction.amount)
    .reduce((total, amount) => total + amount);
};

export const getExpensesThisWeek = async (): Promise<number> => {
  const today = new Date();
  const lastMonday = new Date().setDate(today.getDate() - today.getDay());
  const lastMondayMidnight = new Date(lastMonday).setHours(0, 0, 0, 0);

  const transactions: ITransaction[] = await new TransactionQuery()
    .gte("Date", lastMondayMidnight)
    .lt("Amount", 0)
    .execute();

  return transactions
    .map(transaction => transaction.amount)
    .reduce((total, amount) => total + amount);
};

export const getExpensesThisMonth = async (): Promise<number> => {
  const today = new Date();
  const firstOfTheMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const firstOfTheMonthMidnight = new Date(firstOfTheMonth).setHours(
    0,
    0,
    0,
    0
  );

  const transactions: ITransaction[] = await new TransactionQuery()
    .gte("Date", firstOfTheMonthMidnight)
    .lt("Amount", 0)
    .execute();

  return transactions
    .map(transaction => transaction.amount)
    .reduce((total, amount) => total + amount);
};

export const getIncomeThisMonth = async (): Promise<number> => {
  const today = new Date();
  const firstOfTheMonth = new Date(today.getFullYear(), today.getMonth(), 1);
  const firstOfTheMonthMidnight = new Date(firstOfTheMonth).setHours(
    0,
    0,
    0,
    0
  );

  const transactions: ITransaction[] = await new TransactionQuery()
    .gte("Date", firstOfTheMonthMidnight)
    .gt("Amount", 0)
    .execute();

  return transactions
    .map(transaction => transaction.amount)
    .reduce((total, amount) => total + amount);
};

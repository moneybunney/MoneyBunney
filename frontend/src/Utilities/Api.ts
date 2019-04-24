import { IAccount } from "../Models/AccountModel";
import { IFilters } from "../Models/TransactionFilterModel";
import { ITransaction } from "../Models/TransactionModel";
import { get, post } from "./Http";
import { TransactionQuery } from "./TransactionQuery/TransactionQuery";

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
    Category: data.category.toString(),
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

    //TODO: Support for Transfers
  }

  return query;
};

export const getTransactionListChunk = async (
  startingDate: Date,
  count: number,
  filters: IFilters
) => {
  let query = new TransactionQuery()
    .sort("Date", -1)
    .lt("Date", startingDate.toISOString())
    .limit(count);

  query = applyFilters(query, filters);

  return query.execute();
};

export const createAccount = async (
  accountName: string,
  initialBalance: number
) => {
  return "RESPONSE";
};

export const getAccounts = async () => {
  const accounts: IAccount[] = [
    { id: 1, name: "Cash", initialBalance: 53.86 },
    { id: 2, name: "Revolut", initialBalance: 2131.42 }
  ];

  return accounts;
};

import { IAccount } from "../Models/AccountModel";
import { ITransaction } from "../Models/TransactionModel";
import { AccountQuery } from "./AccountQuery/AccountQuery";
import { post } from "./Http";
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

export const getTransactionListChunk = async (
  startingDate: Date,
  count: number
) => {
  return new TransactionQuery()
    .sort("Date", -1)
    .lt("Date", startingDate.toISOString())
    .limit(count)
    .execute();
};

export const postAccount = async (data: IAccount) => {
  const DTO = {
    Name: data.name.toString(),
    InitialBalance: Number(data.initialBalance)
  };
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

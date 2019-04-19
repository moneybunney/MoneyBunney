import { IAccount } from "../Models/AccountModel";
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

export const getExpenseByCategoryChart = async () => {
  return new TransactionQuery().lt("Amount", 0).sum("Category");
};

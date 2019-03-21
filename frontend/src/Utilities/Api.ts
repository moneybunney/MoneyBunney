import { ITransaction } from "../Models/TransactionModel";
import { post } from "./Http";

interface ILoginData {
  email: string;
  password: string;
}

export const postLogin = (data: ILoginData) =>
  post("/api/user/login", data).then((response) => {
    if (response.status === 200) {
      return response.body;
    } else {
      throw new Error("Login unsuccessful");
    }
  });

export const postRegister = (data: ILoginData) =>
  post("/api/user", data).then((response) => {
    if (response.status === 201) {
      return response.body;
    } else {
      throw new Error("Email is already used");
    }
  });

export const postTransaction = (data: ITransaction) => {
  const DTO = {
    Date: new Date(data.date).toISOString(),
    Account: data.account.toString(),
    Category: data.category.toString(),
    Price: Number(data.price),
    Description: data.description,
    Tags: data.tags,
  };
  post("/api/transactions", DTO).then((response) => {
    if (response.status === 201) {
      return response.body;
    } else {
      throw new Error("Something went wrong");
    }
  });
};

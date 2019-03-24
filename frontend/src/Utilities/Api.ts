import { ITransaction } from "../Models/TransactionModel";
import { get, post } from "./Http";

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

export const postTransaction = async (data: ITransaction) => {
  const DTO = {
    Date: new Date(data.date).toISOString(),
    Account: data.account.toString(),
    Category: data.category.toString(),
    Amount: Number(data.amount),
    Description: data.description,
    Tags: data.tags,
  };
  const response = await post("/api/transactions", DTO);
  if (response.status === 201) {
    return response.body;
  } else {
    throw new Error("Something went wrong");
  }
};

export const getTransactionListChunk = async (startingDate: Date, count: number) => {
  const params = new Map<string, string>([
    ["date", startingDate.toISOString()],
    ["number", String(count)],
  ]);

  const response = await get("/api/transactions/list", params);
  if (response.status === 200) {
    return response.json().then((data) => {
      const dtoArray = data as any[];
      return dtoArray.map((element): ITransaction => {
        return {
          date: element.Date,
          account: element.Account,
          category: element.Category,
          amount: String(element.Amount),
          description: element.Description,
          tags: element.Tags,
          id: element._id,
        };
      });
    });
  } else {
    throw new Error("Something went wrong");
  }
};

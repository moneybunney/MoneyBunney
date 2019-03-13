import { post } from "./Http";

interface ILoginData {
  username: string;
  password: string;
}

export const postLogin = (data: ILoginData) => post("/user/login", data);
export const postRegister = (data: ILoginData) => post("/user", data);

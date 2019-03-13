import { post } from "./Http";

interface ILoginData {
  email: string;
  password: string;
}

export const postLogin = (data: ILoginData) => post("/api/user/login", data);
export const postRegister = (data: ILoginData) => post("/api/user", data);

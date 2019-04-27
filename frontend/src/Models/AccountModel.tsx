export interface IAccount {
  id: string;
  name: string;
  initialBalance: number;
}

export const createEmptyAccount = (): IAccount => ({
  name: "",
  initialBalance: NaN,
  id: ""
});

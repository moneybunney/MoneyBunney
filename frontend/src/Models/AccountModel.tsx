export interface IAccount {
  id: string;
  name: string;
  balance: number;
}

export interface IAccountCreateDTO {
  Name: string;
  InitialBalance: number;
}

export const getAccountName = (id: string, accounts: IAccount[]) => {
  const accountsWithId = accounts.filter(acc => acc.id === id);
  return accountsWithId.length !== 0 ? accountsWithId[0].name : "";
};

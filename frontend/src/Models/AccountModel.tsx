export interface IAccount {
  id: string;
  name: string;
  initialBalance: number;
}

export const getAccountName = (id: string, accounts: IAccount[]) => {
  const accountsWithId = accounts.filter(acc => acc.id === id);
  return accountsWithId.length !== 0 ? accountsWithId[0].name : "";
};

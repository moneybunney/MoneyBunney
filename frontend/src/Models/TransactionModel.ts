export interface ITransaction {
  id: string;
  date: string;
  account: string; // account index
  category: number; // category index
  amount: number;
  description: string;
  tags: string[];
}

export const createEmptyTransaction = (
  overrides: Partial<ITransaction>
): ITransaction => ({
  account: "0",
  category: -1,
  date: getNowDate(),
  description: "",
  amount: NaN, // to keep the initial data field empty
  tags: [],
  id: "",
  ...overrides
});

export const getNowDate = () => {
  const pad = (s: number) => (String(s).length < 2 ? "0" + s : s);
  const d = new Date();
  const month = pad(d.getMonth() + 1);
  const day = pad(d.getDate());
  const date = d.getFullYear() + "-" + month + "-" + day;
  const hours = pad(d.getHours());
  const minutes = pad(d.getMinutes());
  const time = hours + ":" + minutes;
  return date + "T" + time;
};

export interface ICategory {
  id: number;
  text: string;
}

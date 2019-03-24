export default interface ICategory {
  id: number;
  text: string;
}

export const createCategory = (i: number, t: string): ICategory => ({
  id: i,
  text: t
});

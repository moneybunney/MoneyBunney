export default interface IAccount {
    id: number;
    text: string;
}

export const createAccount = (i: number, t: string): IAccount => ({
    id: i,
    text: t,
});

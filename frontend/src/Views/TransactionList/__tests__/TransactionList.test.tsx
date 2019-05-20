import { createMuiTheme } from "@material-ui/core";
import { ThemeProvider } from "@material-ui/styles";
import { mount, shallow } from "enzyme";
import React from "react";

import { IAccount } from "../../../Models/AccountModel";
import {
  createEmptyTransaction,
  ICategory,
  ITransaction
} from "../../../Models/TransactionModel";

import TransactionList from "../TransactionList";

describe("<TransactionList />", () => {
  const transactions: ITransaction[] = [
    {
      ...createEmptyTransaction({ category: "0" })
    }
  ];

  const categories: ICategory[] = [
    {
      id: "1",
      text: "foo"
    }
  ];

  const accounts: IAccount[] = [
    {
      id: "0",
      name: "Bar",
      initialBalance: 0
    }
  ];

  const theme = createMuiTheme({
    typography: {
      useNextVariants: true
    }
  });

  const requestMoreTransactions = jest.fn();

  it("Doesn't crash when rendering", () => {
    expect(() => {
      mount(
        <ThemeProvider theme={theme}>
          <TransactionList
            transactions={transactions}
            accounts={accounts}
            categories={categories}
            requestMoreTransactions={requestMoreTransactions}
            canLoadMore={true}
            loading={true}
          />
        </ThemeProvider>
      );
    }).not.toThrow();
  });

  it("Doesn't crash when accounts are not loaded", () => {
    expect(() => {
      mount(
        <ThemeProvider theme={theme}>
          <TransactionList
            transactions={transactions}
            accounts={[]}
            categories={categories}
            requestMoreTransactions={requestMoreTransactions}
            canLoadMore={true}
            loading={true}
          />
        </ThemeProvider>
      );
    }).not.toThrow();
  });

  it("Doesn't crash when categories are not loaded", () => {
    expect(() => {
      mount(
        <ThemeProvider theme={theme}>
          <TransactionList
            transactions={transactions}
            accounts={accounts}
            categories={[]}
            requestMoreTransactions={requestMoreTransactions}
            canLoadMore={true}
            loading={true}
          />
        </ThemeProvider>
      );
    }).not.toThrow();
  });
});

import React from "react";
import ReactDOM from "react-dom";
import {
  createEmptyTransaction,
  IAccount,
  ICategory
} from "../../Models/TransactionModel";
import TransactionList from "./TransactionList";

const mockTransactions = [0, 1, 2].map(i => {
  const transaction = createEmptyTransaction();
  transaction.category = i;
  return transaction;
});

mockTransactions[2].date = "2019-03-07T12:30";

const mockCategories = ["Beer", "Wine", "Other"].map(
  (item, index): ICategory => ({ id: index, text: item })
);
const mockAccounts = ["Cash", "Wallet", "Revolut"].map(
  (item, index): IAccount => ({ id: index, text: item })
);

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <TransactionList
      transactions={mockTransactions}
      categories={mockCategories}
      accounts={mockAccounts}
      // tslint:disable-next-line:jsx-no-lambda
      requestMoreTransactions={() => {
        return;
      }}
      canLoadMore={true}
      loading={true}
    />,
    div
  );
});

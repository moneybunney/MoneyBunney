import { Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { useEffect, useState } from "react";

import { IAccount, ICategory } from "../../Models/TransactionModel";

import CreateTransactionButton from "./CreateTransactionButton";
import TransactionFilter from "./TransactionFilter";
import TransactionListContainer from "./TransactionListContainer";

const useStyles = makeStyles((theme: Theme) => ({
  createFab: {
    position: "fixed",
    bottom: theme.spacing.unit * 10,
    right: theme.spacing.unit * 10
  },
  filterFab: {
    position: "fixed",
    bottom: theme.spacing.unit * 10,
    right: theme.spacing.unit * 20
  }
}));

// Contains the ids of the filtered fields
export interface IFilters {
  accounts: string[];
  categories: string[];
  transactionTypes: string[];
  tags: string[];
}
export type FilterKeys = keyof IFilters;

export const emptyFilterObject: IFilters = {
  accounts: [],
  categories: [],
  transactionTypes: [],
  tags: []
};

export interface IKeyValuePair<K, V> {
  key: K;
  value: V;
}

export type FilterItem = IKeyValuePair<string, string>;
export type FilterItemArray = FilterItem[];

export interface IFilterItems {
  accounts: FilterItemArray;
  categories: FilterItemArray;
  transactionTypes: FilterItemArray;
  tags: FilterItemArray;
}

const hardcodedCategories = ["Beer", "Wine", "Other"].map(
  (item, index): ICategory => ({ id: index, text: item })
);
const hardcodedAccounts = ["Cash", "Wallet", "Revolut"].map(
  (item, index): IAccount => ({ id: index, name: item })
);

const TransactionView = () => {
  const classes = useStyles();

  const [filters, setFilters] = useState<IFilters>(emptyFilterObject);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [accounts, setAccounts] = useState<IAccount[]>([]);

  const filterItems: IFilterItems = {
    accounts: accounts.map(({ id, name }) => ({
      key: id.toString(),
      value: name
    })),
    categories: categories.map(({ id, text }) => ({
      key: id.toString(),
      value: text
    })),
    transactionTypes: ["Expense", "Income", "Transfer"].map(item => ({
      key: item,
      value: item
    })),
    tags: ["foo", "bar", "baz", "bez", "booze", "bamboozle"].map(item => ({
      key: item,
      value: item
    }))
  };

  useEffect(() => {
    setAccounts(hardcodedAccounts);
    setCategories(hardcodedCategories);
  }, []);

  return (
    <>
      <TransactionListContainer accounts={accounts} categories={categories} />
      <CreateTransactionButton className={classes.createFab} />
      <TransactionFilter
        className={classes.filterFab}
        setFilters={setFilters}
        filters={filters}
        items={filterItems}
      />
    </>
  );
};

export default TransactionView;

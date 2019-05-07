import { Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { useState } from "react";

import { useAccounts, useCategories, useTags } from "../../Hooks/useApi";
import {
  emptyFilterObject,
  IFilterItems,
  IFilters
} from "../../Models/TransactionFilterModel";
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

const TransactionView = () => {
  const classes = useStyles();

  const [filters, setFilters] = useState<IFilters>(emptyFilterObject);
  const { data: categories } = useCategories();
  const { data: accounts } = useAccounts();
  const { data: tags } = useTags();

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
    tags: tags.map(item => ({
      key: item,
      value: item
    }))
  };

  return (
    <>
      <TransactionListContainer
        filters={filters}
        accounts={accounts}
        categories={categories}
      />
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

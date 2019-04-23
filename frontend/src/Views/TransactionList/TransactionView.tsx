import { Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { useState } from "react";

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

const TransactionView = () => {
  const classes = useStyles();

  const [filters, setFilters] = useState<IFilters>(emptyFilterObject);
  const filterItems: IFilters = {
    accounts: ["Cash", "Revolut"],
    categories: ["booze", "wine", "drink", "alcohol", "beer", "other"],
    transactionTypes: ["Expense", "Income", "Transfer"],
    tags: ["foo", "bar", "baz", "bez", "booze", "bamboozle"]
  };

  return (
    <React.Fragment>
      <TransactionListContainer />
      <CreateTransactionButton className={classes.createFab} />
      <div className={classes.filterFab}>
        <TransactionFilter
          setFilters={setFilters}
          filters={filters}
          items={filterItems}
        />
      </div>
    </React.Fragment>
  );
};

export default TransactionView;

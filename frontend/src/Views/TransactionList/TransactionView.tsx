import { Fab, Theme } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import React, { useState } from "react";
import useReactRouter from "use-react-router";

import { TransactionsCreateLocation } from "../../routes.constants";
import TransactionFilter from "./TransactionFilter";
import TransactionListContainer from "./TransactionListContainer";

const useStyles = makeStyles((theme: Theme) => ({
  fab: {
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
  const { history } = useReactRouter();
  const classes = useStyles();

  const [filters, setFilters] = useState<IFilters>(emptyFilterObject);
  const filterItems: IFilters = {
    accounts: ["Cash", "Revolut"],
    categories: ["booze", "wine", "drink", "alcohol", "beer", "other"],
    transactionTypes: ["Expense", "Income", "Transfer"],
    tags: ["foo", "bar", "baz", "bez", "booze", "bamboozle"]
  };

  const onClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.preventDefault();
    history.replace(TransactionsCreateLocation);
  };

  return (
    <React.Fragment>
      <TransactionListContainer />
      <Fab
        onClick={onClick}
        color="primary"
        className={classes.fab}
        aria-label="Add"
      >
        <Add />
      </Fab>
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

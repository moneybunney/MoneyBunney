import { Fab, Theme } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import React from "react";
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

const TransactionView = () => {
  const { history } = useReactRouter();
  const classes = useStyles();

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
        <TransactionFilter />
      </div>
    </React.Fragment>
  );
};

export default TransactionView;

import React from "react";

import { Paper, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { IAccount } from "../../Models/AccountModel";
import AccountList from "./AccountList";

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    display: "block",
    // the child list fills the parent
    width: "60%",
    marginTop: 32,
    marginBottom: 16,
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(360 + theme.spacing.unit * 3 * 2)]: {
      marginLeft: "auto",
      marginRight: "auto"
    }
  }
}));

const accounts: IAccount[] = [
  { id: 1, name: "Cash", startingBalance: 53.86 },
  { id: 2, name: "Revolut", startingBalance: 2131.42 }
];

const Accounts = () => {
  const classes = useStyles();
  return (
    <Paper className={classes.paper}>
      <AccountList accounts={accounts} />
    </Paper>
  );
};

export default Accounts;

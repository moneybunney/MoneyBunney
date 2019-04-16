import { Paper, Theme, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import useReactRouter from "use-react-router";

import { AccountsLocation } from "../../routes.constants";
import { createAccount } from "../../Utilities/Api";
import AccountForm from "./AccountForm";

const useStyles = makeStyles((theme: Theme) => ({
  layout: {
    width: "auto",
    marginRight: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  paper: {
    marginBottom: theme.spacing.unit * 3,
    marginTop: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginBottom: theme.spacing.unit * 6,
      marginTop: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3
    }
  }
}));

const AccountCreation = () => {
  const classes = useStyles();
  const { history } = useReactRouter();

  const onSubmit = async (accountName: string, initialBalance: number) => {
    await createAccount(accountName, initialBalance);
    alert(`SUCCESFULY CREATED ACCOUNT ${accountName} ${initialBalance}`);
    history.replace(AccountsLocation);
  };

  return (
    <main className={classes.layout}>
      <Paper className={classes.paper}>
        <Typography component="h1" variant="h5" align="left">
          New Account
        </Typography>
        <React.Fragment>
          <AccountForm onSubmit={onSubmit} />
        </React.Fragment>
      </Paper>
    </main>
  );
};

export default AccountCreation;

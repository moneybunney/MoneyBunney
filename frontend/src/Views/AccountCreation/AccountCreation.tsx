import { Paper, Theme, Typography } from "@material-ui/core";
import React from "react";

import { makeStyles } from "@material-ui/styles";
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

  const onSubmit = (accountName: string, initialBalance: number) => {
    alert(`${accountName} ${initialBalance}`);
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

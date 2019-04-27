import { Paper, Theme, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import useReactRouter from "use-react-router";

import { createEmptyAccount, IAccount } from "../../Models/AccountModel";
import { AccountsLocation } from "../../routes.constants";
import { postAccount } from "../../Utilities/Api";
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
interface IProps {
  onSubmit?: (account: IAccount) => void;
}
const AccountCreation = (props: IProps) => {
  const classes = useStyles();
  const { history } = useReactRouter();

  const [account, setAccount] = React.useState(createEmptyAccount());
  const onFieldChange = (field: string, value: any) => {
    const clone = { ...account } as any;
    clone[field] = value;
    setAccount(clone);
  };
  const onSubmit = (currentAccount: IAccount) => {
    if (props.onSubmit) {
      props.onSubmit(currentAccount);
    }
    postAccount(currentAccount)
      .catch(error => {
        console.log(error);
      })
      .then(() => {
        alert(
          "Success! " + account.name + " account has been successfully created."
        );
      });
  };
  return (
    <main className={classes.layout}>
      <Paper className={classes.paper}>
        <Typography component="h1" variant="h5" align="left">
          New Account
        </Typography>
        <React.Fragment>
          <AccountForm
            onFieldChange={onFieldChange}
            account={account}
            onSubmit={onSubmit}
          />
        </React.Fragment>
      </Paper>
    </main>
  );
};

export default AccountCreation;

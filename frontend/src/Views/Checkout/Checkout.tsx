import { Paper, Theme, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { useState } from "react";
import { useAccounts, useCategories } from "../../Hooks/useApi";
import {
  createEmptyTransaction,
  ITransaction
} from "../../Models/TransactionModel";
import { postTransaction } from "../../Utilities/Api";
import TransactionForm from "./TransactionForm";

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
  onSubmit?: (transaction: ITransaction) => void;
}

const Checkout = (props: IProps) => {
  const { data: categories } = useCategories();
  const { data: accounts } = useAccounts();

  const [transaction, setTransaction] = useState(createEmptyTransaction());

  const [loading, setLoading] = useState(false);
  const classes = useStyles();

  const onFieldChange = (field: string, value: any) => {
    const clone = { ...transaction } as any;
    clone[field] = value;
    setTransaction(clone);
  };

  const onSubmit = (currentTransaction: ITransaction) => {
    setLoading(true);
    if (props.onSubmit) {
      props.onSubmit(currentTransaction);
    }
    postTransaction(currentTransaction)
      .catch(error => {
        console.log(error);
      })
      .then(() => {
        setLoading(false);
        alert("Success!");
      });
  };

  return (
    <React.Fragment>
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="left">
            New Transaction
          </Typography>
          <React.Fragment>
            <TransactionForm
              onFieldChange={onFieldChange}
              transaction={transaction}
              categories={categories}
              accounts={accounts}
              loading={loading}
              onSubmit={onSubmit}
            />
          </React.Fragment>
        </Paper>
      </main>
      ;
    </React.Fragment>
  );
};

export default Checkout;

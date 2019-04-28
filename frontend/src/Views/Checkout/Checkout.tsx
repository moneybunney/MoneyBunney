import { Paper, Theme, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { useEffect, useState } from "react";
import { IAccount } from "../../Models/AccountModel";
import {
  createEmptyTransaction,
  ITransaction
} from "../../Models/TransactionModel";
import { getAccounts, postTransaction } from "../../Utilities/Api";
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

export interface ICategory {
  id: number;
  text: string;
}

const Checkout = (props: IProps) => {
  // fetch these from the api aswell
  const categories = ["Beer", "Wine", "Other"].map(
    (item, index): ICategory => ({ id: index, text: item })
  );

  const [transaction, setTransaction] = React.useState(
    createEmptyTransaction()
  );

  const [loading, setLoading] = React.useState(false);
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

  const [accounts, setAccounts] = useState<IAccount[]>([]);
  useEffect(() => {
    (async () => {
      setAccounts(await getAccounts());
    })();
  }, []);

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

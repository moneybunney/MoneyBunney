import {
  createStyles,
  CssBaseline,
  Paper,
  Theme,
  Typography,
  withStyles,
  WithStyles,
} from "@material-ui/core";
import React from "react";
import withRoot from "../../withRoot";
import TransactionFormUI from "./TransactionFormUI";
import ITransaction, { createEmptyTransaction } from "./TransactionModel";

interface IState {
  activeStep: number;
}

const styles = (theme: Theme) => createStyles({
  layout: {
    width: "auto",
    marginRight: theme.spacing.unit * 2,
    marginLeft: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 2 * 2)]: {
      width: 600,
      marginLeft: "auto",
      marginRight: "auto",
    },
  },
  paper: {
    marginBottom: theme.spacing.unit * 3,
    marginTop: theme.spacing.unit * 3,
    padding: theme.spacing.unit * 2,
    [theme.breakpoints.up(600 + theme.spacing.unit * 3 * 2)]: {
      marginBottom: theme.spacing.unit * 6,
      marginTop: theme.spacing.unit * 6,
      padding: theme.spacing.unit * 3,
    },
  },
});

interface IProps extends WithStyles<typeof styles> {
  onSubmit?: (transaction: ITransaction) => void;
}

export interface ICategory {
  id: number;
  text: string;
}

export interface IAccount {
  id: number;
  text: string;
}

const Checkout = (props: IProps) => {

  // fetch these from the api aswell
  const categories = ["Beer", "Wine", "Other"].map((item, index): ICategory => ({id: index, text: item }));
  const accounts = ["Cash", "Wallet", "Revolut"].map((item, index): IAccount => ({id: index, text: item }));

  const [transaction, setTransaction] = React.useState(createEmptyTransaction());

  const [loading, setLoading] = React.useState(false);
  const classes = props.classes;

  const onFieldChange = (field: string, value: any) => {
    const clone = {...transaction} as any;
    clone[field] = value;
    setTransaction(clone);
  };

  const onSubmit = () => {
    // console.log(transaction);
    setLoading(true);
    const _ = (props.onSubmit && props.onSubmit(transaction));
    setTimeout(() => {
      setLoading(false);
      alert("Success!");
    }, 1000);
  };

  return (
        <React.Fragment>
          <CssBaseline />
          <main className={classes.layout}>
            <Paper className={classes.paper}>
              <Typography component="h1" variant="h4" align="left">
                New Transaction
              </Typography>
              <React.Fragment>
                  <TransactionFormUI
                    onFieldChange={onFieldChange}
                    transaction={transaction}
                    categories={categories}
                    accounts={accounts}
                    loading={loading}
                    onSubmit={onSubmit}
                  />
              </React.Fragment>
            </Paper>
          </main>;
        </React.Fragment >
      );
};

export default withRoot(withStyles(styles)(Checkout));

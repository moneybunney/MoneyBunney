import {
  Button,
  createStyles,
  CssBaseline,
  Grid,
  Paper,
  Step,
  StepLabel,
  Stepper,
  TextField,
  Theme,
  Typography,
  withStyles,
  WithStyles,
} from "@material-ui/core";
import React, { SyntheticEvent } from "react";
import { fileURLToPath } from "url";
import withRoot from "../../withRoot";
import { createAccount } from "./AccountModel";
import { createCategory } from "./CategoryModel";
import TransactionFormUI from "./TransactionFormUI";
import ITransaction, { createEmptyTransaction } from "./TransactionModel";

interface IState {
  activeStep: number;
}

// tslint:disable:object-literal-sort-keys
const styles = (theme: Theme) => createStyles({
  buttons: {
    // display: "flex",
    // justifyContent: "flex-end",
  },
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
  stepper: {
    padding: `${theme.spacing.unit * 3}px 0 ${theme.spacing.unit * 5}px`,
  },
  button: {
    marginTop: theme.spacing.unit * 3,
    marginLeft: theme.spacing.unit,
  },
  textField: {

  },
});

interface IProps extends WithStyles<typeof styles> {
  onSubmit: (transaction: ITransaction) => any;
}

const Checkout = (props: IProps) => {

  // fetch these from the api aswell
  const categories = ["Beer", "Wine", "Other"].map((item, index) => createCategory(index, item));
  const accounts = ["Cash", "Wallet", "Revolut"].map((item, index) => createAccount(index, item));

  const [transaction, setTransaction] = React.useState(createEmptyTransaction());

  const classes = props.classes;
  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    // tslint:disable-next-line:no-console
    console.log(transaction);
    // props.onSubmit(transaction);
  };

  const onFieldChange = (field: string, value: any) => {
    const tmp = transaction as any;
    tmp[field] = value;
    setTransaction(tmp as ITransaction);
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
                <form onSubmit={handleSubmit}>
                  <TransactionFormUI
                    onFieldChange={onFieldChange}
                    initalTransaction={transaction}
                    categories={categories}
                    accounts={accounts}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    type="submit"
                  >
                    Submit
                  </Button>
                </form>
              </React.Fragment>
            </Paper>
          </main>;
        </React.Fragment >
      );
};

export default withRoot(withStyles(styles)(Checkout as any));

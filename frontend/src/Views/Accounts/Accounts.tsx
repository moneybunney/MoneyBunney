import React from "react";

import {
  createStyles,
  Paper,
  Theme,
  Typography,
  withStyles,
  WithStyles
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { IAccount } from "../../Models/TransactionModel";
import AccountList from "./AccountList";

const styles = (theme: Theme) =>
  createStyles({
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
  });
export interface IProps extends WithStyles<typeof styles> {}

const accounts: IAccount[] = [
  { id: 1, text: "Cash" },
  { id: 2, text: "Revolut" }
];

const Accounts = ({ classes }: IProps) => {
  return (
    <Paper className={classes.paper}>
      <AccountList accounts={accounts} />
    </Paper>
  );
};

export default withStyles(styles)(Accounts);

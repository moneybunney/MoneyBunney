import {
  createStyles,
  ListItemSecondaryAction,
  Theme,
  Typography,
  WithStyles,
  withStyles
} from "@material-ui/core";
import React from "react";

const styles = (theme: Theme) =>
  createStyles({
    amountText: {
      fontWeight: 500,
      margin: 16
    },
    expense: {
      color: "#f6787f"
    },
    income: {
      color: "#68bcbe"
    }
  });

interface IProps extends WithStyles<typeof styles> {
  amount: number;
}

const TransactionListItemAmount = ({ amount: amount, classes }: IProps) => {
  const spending = amount < 0;
  const amountText =
    (spending ? "-" : "+") + " " + Math.abs(amount).toFixed(2) + "€";
  return (
    <ListItemSecondaryAction>
      <Typography className={classes.amountText}>
        <span className={spending ? classes.expense : classes.income}>
          {amountText}
        </span>
      </Typography>
    </ListItemSecondaryAction>
  );
};

export default withStyles(styles)(TransactionListItemAmount);
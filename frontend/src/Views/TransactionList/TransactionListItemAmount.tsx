import { ListItemSecondaryAction, Theme, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";

const useStyles = makeStyles((theme: Theme) => ({
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
}));

interface IProps {
  amount: number;
}

const TransactionListItemAmount = ({ amount: amount }: IProps) => {
  const classes = useStyles();

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

export default TransactionListItemAmount;

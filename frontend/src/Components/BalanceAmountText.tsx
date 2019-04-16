import { Theme, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";

const useStyles = makeStyles((theme: Theme) => ({
  amountText: {
    fontWeight: 500,
    margin: 16
  },
  negative: {
    color: "#f6787f"
  },
  positive: {
    color: "#68bcbe"
  }
}));

interface IProps {
  amount: number;
  difference: boolean;
}

const BalanceAmountText = ({ amount, difference }: IProps) => {
  const classes = useStyles();

  const negative = amount < 0;
  let amountText = `${Math.abs(amount).toFixed(2)}€`;

  if (difference) {
    const sign = negative ? "-" : "+";
    amountText = `${sign} ${amountText}`;
  }

  return (
    <Typography className={classes.amountText}>
      <span className={negative ? classes.negative : classes.positive}>
        {amountText}
      </span>
    </Typography>
  );
};

export default BalanceAmountText;

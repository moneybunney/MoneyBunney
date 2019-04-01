import {
  createStyles,
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
    negative: {
      color: "#f6787f"
    },
    positive: {
      color: "#68bcbe"
    }
  });

interface IProps extends WithStyles<typeof styles> {
  amount: number;
  difference: boolean;
}

const BalanceAmountText = ({ amount, difference, classes }: IProps) => {
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

export default withStyles(styles)(BalanceAmountText);

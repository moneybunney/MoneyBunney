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
    priceText: {
      fontWeight: 500,
      margin: 16
    },
    spending: {
      color: "#f6787f"
    },
    gain: {
      color: "#68bcbe"
    }
  });

interface IProps extends WithStyles<typeof styles> {
  price: number;
}

const TransactionListItem = ({ price, classes }: IProps) => {
  const spending = price < 0;
  const priceText =
    (spending ? "-" : "+") + " " + Math.abs(price).toFixed(2) + "€";
  return (
    <ListItemSecondaryAction>
      <Typography className={classes.priceText}>
        <span className={spending ? classes.spending : classes.gain}>
          {priceText}
        </span>
      </Typography>
    </ListItemSecondaryAction>
  );
};

export default withStyles(styles)(TransactionListItem);

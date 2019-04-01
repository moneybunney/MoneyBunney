import {
  createStyles,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Theme,
  Typography,
  WithStyles,
  withStyles
} from "@material-ui/core";
import React from "react";
import { IAccount } from "../../Models/TransactionModel";

const styles = (theme: Theme) =>
  createStyles({
    balanceText: {
      fontWeight: 500,
      margin: 16,
      color: "#68bcbe"
    }
  });

interface IProps extends WithStyles<typeof styles> {
  account: IAccount;
}

const AccountListItem = ({ account, classes }: IProps) => {
  return (
    <ListItem button={true}>
      <ListItemText primary={account.text} />
      <ListItemSecondaryAction>
        <Typography className={classes.balanceText}>100</Typography>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default withStyles(styles)(AccountListItem);

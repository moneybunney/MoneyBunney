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
import { RouteComponentProps, withRouter } from "react-router-dom";
import { IAccount } from "../../Models/TransactionModel";

const styles = (theme: Theme) =>
  createStyles({
    balanceText: {
      fontWeight: 500,
      margin: 16,
      color: "#68bcbe"
    }
  });

interface IProps extends WithStyles<typeof styles>, RouteComponentProps<any> {
  account: IAccount;
}

const AccountListItem = ({ account, classes, history }: IProps) => {
  const onClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.preventDefault();
    history.replace(`/transactions?account=${account.text}`);
  };

  return (
    <ListItem button={true} onClick={onClick}>
      <ListItemText primary={account.text} />
      <ListItemSecondaryAction>
        <Typography className={classes.balanceText}>100</Typography>
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default withRouter(withStyles(styles)(AccountListItem));

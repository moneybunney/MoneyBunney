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
import BalanceAmountText from "../../Components/BalanceAmountText";
import { IAccount } from "../../Models/AccountModel";

const styles = (theme: Theme) => createStyles({});

interface IProps extends WithStyles<typeof styles>, RouteComponentProps<any> {
  account: IAccount;
}

const AccountListItem = ({ account, classes, history }: IProps) => {
  const onClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.preventDefault();
    history.replace(`/transactions?account=${account.name}`);
  };

  return (
    <ListItem button={true} onClick={onClick}>
      <ListItemText primary={account.name} />
      <ListItemSecondaryAction>
        <BalanceAmountText
          amount={account.startingBalance}
          difference={false}
        />
      </ListItemSecondaryAction>
    </ListItem>
  );
};

export default withRouter(withStyles(styles)(AccountListItem));

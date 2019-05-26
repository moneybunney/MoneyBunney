import {
  Collapse,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Theme
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { useEffect, useState } from "react";
import useReactRouter from "use-react-router";
import BalanceAmountText from "../../Components/BalanceAmountText";
import { IAccount } from "../../Models/AccountModel";
import { TransactionsLocation } from "../../routes.constants";
import DeleteItemButton from "../DeleteItemButton";

const useStyles = makeStyles((theme: Theme) => ({
  secondary: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
}));

interface IProps {
  account: IAccount;
  onDeleted: (id: string) => void;
}

const AccountListItem = ({ account, onDeleted }: IProps) => {
  const classes = useStyles();
  const { history } = useReactRouter();

  const [shown, setShown] = React.useState(false);
  const [deleted, setDeleted] = React.useState(false);

  useEffect(() => {
    if (!deleted) {
      setShown(true);
    }
  }, [deleted]);

  const onDeleteWrapper = () => {
    setDeleted(true);
    setShown(false);
    // let the closing animation play out
    setTimeout(() => onDeleted(account.id), 400);
  };

  const onClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.preventDefault();
    history.replace(`${TransactionsLocation}?account=${account.id}`);
  };

  return (
    <Collapse in={shown}>
      <ListItem button={true} onClick={onClick}>
        <ListItemText primary={account.name} />
        <ListItemSecondaryAction className={classes.secondary}>
          <BalanceAmountText amount={account.balance} difference={false} />
          <DeleteItemButton
            path="/api/accounts"
            params={new Map([["id", account.id]])}
            onDeleted={onDeleteWrapper}
          />
        </ListItemSecondaryAction>
      </ListItem>
    </Collapse>
  );
};

export default AccountListItem;

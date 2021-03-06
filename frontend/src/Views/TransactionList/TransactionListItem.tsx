import {
  Collapse,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
  Theme
} from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { useEffect } from "react";
import DeleteItemButton from "../../Components/DeleteItemButton";
import { useAccounts } from "../../Hooks/useApi";
import { ITransaction } from "../../Models/TransactionModel";
import { TransactionsCreateLocation } from "../../routes.constants";
import TransactionListItemPrice from "./TransactionListItemAmount";
import TransactionListItemIcon from "./TransactionListItemIcon";

const useStyles = makeStyles((theme: Theme) => ({
  primary: {
    marginRight: "64px"
  },
  secondary: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  },
  itemContainer: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
  }
}));

interface IProps {
  transaction: ITransaction;
  categoryText: string;
  categoryIcon: string;
  accountText: string;
  onTransactionDeleted: (id: string) => void;
}

const toDisplayDate = (d: Date) => {
  const pad = (s: number) => (String(s).length < 2 ? "0" + s : s);
  const month = pad(d.getMonth() + 1);
  const day = pad(d.getDate());
  const date = d.getFullYear() + "-" + month + "-" + day;
  const hours = pad(d.getHours());
  const minutes = pad(d.getMinutes());
  const time = hours + ":" + minutes;
  return date + " " + time;
};

const TransactionListItem = ({
  transaction,
  categoryText,
  categoryIcon,
  accountText,
  onTransactionDeleted
}: IProps) => {
  const classes = useStyles();
  const [shown, setShown] = React.useState(false);
  const [deleted, setDeleted] = React.useState(false);
  const [isMobile, setIsMobile] = React.useState(false);

  useEffect(() => {
    if (!deleted) {
      setShown(true);
    }
    setIsMobile(window.innerWidth < 720);
  }, [deleted]);

  const onDeleteWrapper = () => {
    setDeleted(true);
    setShown(false);
    // let the closing animation play out
    setTimeout(() => onTransactionDeleted(transaction.id), 400);
  };

  const maxPrimaryLen = isMobile ? 36 : 96;

  const primaryText =
    transaction.description && transaction.description.length < maxPrimaryLen
      ? transaction.description
      : categoryText;

  const parsedAmount = transaction.amount;

  const parsedDate = new Date(transaction.date);
  const today = new Date();
  today.setHours(0);
  today.setMinutes(0);
  today.setSeconds(0);

  const dateString = parsedDate >= today ? "Today" : toDisplayDate(parsedDate);
  const secondaryString =
    (accountText.length < 15 ? `${accountText} — ` : "") + dateString;
  return (
    <Collapse in={shown}>
      <ListItem button={true} className={classes.itemContainer}>
        <TransactionListItemIcon
          iconId={categoryIcon !== "" ? categoryIcon : undefined}
        />
        <ListItemText
          className={classes.primary}
          primary={primaryText}
          secondary={secondaryString}
        />
        <ListItemSecondaryAction className={classes.secondary}>
          <TransactionListItemPrice amount={parsedAmount} />
          <DeleteItemButton
            path="/api/transactions"
            params={new Map([["id", transaction.id]])}
            onDeleted={onDeleteWrapper}
          />
        </ListItemSecondaryAction>
      </ListItem>
    </Collapse>
  );
};

export default TransactionListItem;

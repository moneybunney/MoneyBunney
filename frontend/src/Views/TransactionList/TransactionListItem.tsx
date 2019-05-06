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
import { ITransaction } from "../../Models/TransactionModel";
import TransactionListItemPrice from "./TransactionListItemAmount";
import TransactionListItemIcon from "./TransactionListItemIcon";

const useStyles = makeStyles((theme: Theme) => ({
  secondary: {
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
  accountText
}: IProps) => {
  const classes = useStyles();
  const [shown, setShown] = React.useState(false);

  useEffect(() => {
    setShown(true);
  });

  const primaryText = transaction.description
    ? transaction.description
    : categoryText;
  const parsedAmount = transaction.amount;

  const parsedDate = new Date(transaction.date);
  const today = new Date();
  today.setHours(0);
  today.setMinutes(0);
  today.setSeconds(0);

  const dateString = parsedDate >= today ? "Today" : toDisplayDate(parsedDate);
  return (
    <Collapse in={shown}>
      <ListItem button={true}>
        <TransactionListItemIcon
          iconId={categoryIcon !== "" ? categoryIcon : undefined}
        />
        <ListItemText primary={primaryText} secondary={dateString} />
        <ListItemSecondaryAction className={classes.secondary}>
          <TransactionListItemPrice amount={parsedAmount} />
          <DeleteItemButton
            path="api/transactions"
            params={new Map([["id", transaction.id]])}
          />
        </ListItemSecondaryAction>
      </ListItem>
    </Collapse>
  );
};

export default TransactionListItem;

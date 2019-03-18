import {
    Collapse,
    createStyles,
    ListItem,
    ListItemText,
    Theme,
    WithStyles,
    withStyles,
} from "@material-ui/core";
import React, { useEffect } from "react";
import { ITransaction } from "../../Models/TransactionModel";
import TransactionListItemIcon from "./TransactionListItemIcon";
import TransactionListItemPrice from "./TransactionListItemPrice";

const styles = (theme: Theme) => createStyles({
});

interface IProps extends WithStyles<typeof styles> {
    transaction: ITransaction;
    categoryText: string;
    accountText: string;
}

const toDisplayDate = (d: Date) => {
    const pad = (s: number) => String(s).length < 2 ? "0" + s : s;
    const month = pad(d.getMonth() + 1);
    const day = pad(d.getDate());
    const date = d.getFullYear() + "-" + month + "-" + day;
    const hours = pad(d.getHours());
    const minutes = pad(d.getMinutes());
    const time = hours + ":" + minutes;
    return date + " " + time;
};

const TransactionListItem = ({transaction, classes, categoryText, accountText}: IProps) => {
    const [shown, setShown] = React.useState(false);

    useEffect(() => {
        setShown(true);
    });

    const primaryText = transaction.description ? transaction.description : categoryText;
    const parsedPrice = parseFloat(transaction.price);

    const parsedDate = new Date(transaction.date);
    const today = new Date();
    today.setHours(0);
    today.setMinutes(0);
    today.setSeconds(0);

    const dateString = parsedDate >= today ?
        "Today" :
        toDisplayDate(parsedDate);
    return (
        <Collapse in={shown}>
            <ListItem button={true}>
                <TransactionListItemIcon iconId={transaction.category}/>
                <ListItemText primary={primaryText} secondary={dateString}/>
                <TransactionListItemPrice price={parsedPrice}/>
            </ListItem>
        </Collapse>
    );
};

export default withStyles(styles)(TransactionListItem);

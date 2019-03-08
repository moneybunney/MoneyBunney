import { createStyles, ListItem, ListItemText, Theme, WithStyles, withStyles } from "@material-ui/core";
import React from "react";
import ITransaction from "../../Models/TransactionModel";
import TransactionListItemIcon from "./TransactionListItemIcon";

const styles = (theme: Theme) => createStyles({

});

interface IProps extends WithStyles<typeof styles> {
    transaction: ITransaction;
}

const TransactionListItem = ({transaction, classes}: IProps) => {
    return (
        <ListItem>
            <TransactionListItemIcon iconId={transaction.category}/>
            <ListItemText primary="Test item hehe" secondary="Thats pretty neat"/>
        </ListItem>
    );
};

export default withStyles(styles)(TransactionListItem);

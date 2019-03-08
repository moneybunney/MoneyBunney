import { createStyles, List, Theme, WithStyles, withStyles} from "@material-ui/core";
import {mdiBeer} from "@mdi/js";
import { Icon } from "@mdi/react";
import React from "react";
import { createEmptyTransaction } from "../../Models/TransactionModel";
import TransactionListItem from "./TransactionListItem";

const styles = (theme: Theme) => createStyles({
    listRoot: {
        width: "100%",
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
});

interface IProps extends WithStyles<typeof styles> {
}

const TransactionList = ({classes}: IProps) => {
    const transactions = [1, 2, 3].map((i) => {
        const transaction = createEmptyTransaction();
        transaction.category = i;
        return transaction;
    });
    return (
        <List>
            {transactions.map((t, i) => <TransactionListItem key={"transaction_" + i} transaction={t}/>)}
        </List>
    );
};

export default withStyles(styles)(TransactionList);

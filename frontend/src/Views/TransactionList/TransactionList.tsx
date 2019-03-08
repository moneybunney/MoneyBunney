import { createStyles, List, Paper, Theme, WithStyles, withStyles} from "@material-ui/core";
import React from "react";
import { createEmptyTransaction, IAccount, ICategory } from "../../Models/TransactionModel";
import TransactionListItem from "./TransactionListItem";

const styles = (theme: Theme) => createStyles({
    listRoot: {
        width: "100%",
        backgroundColor: theme.palette.background.paper,
        paddingTop: 0,
        paddingBottom: 0,
    },
    paper: {
        display: "block", // Fix IE 11 issue.
        width: 400,
        marginTop: 32,
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
          marginLeft: "auto",
          marginRight: "auto",
        },
    },
});

interface IProps extends WithStyles<typeof styles> {
}

const TransactionList = ({classes}: IProps) => {
    const transactions = [0, 1, 2].map((i) => {
        const transaction = createEmptyTransaction();
        transaction.category = i;
        transaction.price = String(Math.random() * 100 - 50);
        return transaction;
    });

    transactions[2].date = "2019-03-07T12:30";

    const categories = ["Beer", "Wine", "Other"].map((item, index): ICategory => ({id: index, text: item }));
    const accounts = ["Cash", "Wallet", "Revolut"].map((item, index): IAccount => ({id: index, text: item }));

    return (
        <Paper className={classes.paper}>
            <List className={classes.listRoot}>
                {transactions.map((t, i) =>
                <TransactionListItem
                    key={"transaction_" + i}
                    transaction={t}
                    categoryText={categories[t.category].text}
                    accountText={accounts[t.account].text}
                />)}
            </List>
        </Paper>
    );
};

export default withStyles(styles)(TransactionList);

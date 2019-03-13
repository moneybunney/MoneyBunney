import { createStyles, List, Paper, Theme, WithStyles, withStyles} from "@material-ui/core";
import React from "react";
import ITransaction, { createEmptyTransaction, IAccount, ICategory } from "../../Models/TransactionModel";
import TransactionList from "./TransactionList";

const styles = (theme: Theme) => createStyles({
    paper: {
        display: "block",
        // the child list fills the parent
        width: 360,
        marginTop: 32,
        marginBottom: 128, // to see the loading dummy :)
        marginLeft: theme.spacing.unit * 3,
        marginRight: theme.spacing.unit * 3,
        [theme.breakpoints.up(360 + theme.spacing.unit * 3 * 2)]: {
          marginLeft: "auto",
          marginRight: "auto",
        },
    },
});

interface IProps extends WithStyles<typeof styles> {
}

interface IState {
    transactions: ITransaction[];
    categories: ICategory[];
    accounts: IAccount[];
    canLoadMore: boolean;
    loadingMore: boolean;
    chunksLoaded: number;
}

// this component should load list elements dynamically,
// and (maybe later) support pagination
class TransactionListContainer extends React.Component<IProps, IState>  {
    constructor(props: IProps) {
        super(props);
        const initialTransactions = [0, 1, 2].map((i) => {
            const transaction = createEmptyTransaction();
            transaction.category = i;
            return transaction;
        });

        initialTransactions[2].date = "2019-03-07T12:30";

        const categories = ["Beer", "Wine", "Other"].map((item, index): ICategory => ({id: index, text: item }));
        const accounts = ["Cash", "Wallet", "Revolut"].map((item, index): IAccount => ({id: index, text: item }));

        this.state = {
            transactions: initialTransactions,
            categories,
            accounts,
            loadingMore: false,
            canLoadMore: true,
            chunksLoaded: 1,
        };
    }

    public onRequestMoreTranscations = () => {
        this.setState({loadingMore: true});
        setTimeout(() => {
            const newTransactions: ITransaction[] = [];

            newTransactions.push(...this.state.transactions);
            newTransactions.push(...[0, 1, 2, 3, 5].map((i) => {
                const transaction = createEmptyTransaction();
                transaction.category = Math.floor(Math.random() * 3);
                return transaction;
            }));
            const chunksLoaded = this.state.chunksLoaded + 1;
            let canLoadMore = true;
            if (chunksLoaded >= 10) { // all items are loaded
                canLoadMore = false;
            }
            // it's important to have the state update as a single
            // transaction, so that the child `componentDidUpdate` gets
            // called only once per new batch of items (with valid new settings)
            this.setState({
                loadingMore: false,
                canLoadMore,
                chunksLoaded,
                transactions: newTransactions,
            });
        }, 1500);
    }
    public render() {
        return (
            <Paper className={this.props.classes.paper}>
                <TransactionList
                    transactions={this.state.transactions}
                    categories={this.state.categories}
                    accounts={this.state.accounts}
                    requestMoreTransactions={this.onRequestMoreTranscations}
                    loading={this.state.loadingMore}
                    canLoadMore={this.state.canLoadMore}
                />
            </Paper>
        );
    }
}

export default withStyles(styles)(TransactionListContainer);

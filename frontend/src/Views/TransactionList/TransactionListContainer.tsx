import { createStyles, List, Paper, Theme, WithStyles, withStyles} from "@material-ui/core";
import { Satellite } from "@material-ui/icons";
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

enum ActionType {
    LoadStart = 1,
    ItemsLoaded,
    NoItemsFound,
    Error,
}

interface IAction {
    type: ActionType;
    payload: ITransaction[] | [];
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
const TransactionListContainer = ({classes}: IProps) => {
    const reducer = (oldState: IState, action: IAction): IState => {
        switch (action.type) {
            case ActionType.LoadStart:
                return{
                    ...oldState,
                    loadingMore: true,
                };
            case ActionType.ItemsLoaded:
                const newChunksLoaded = oldState.chunksLoaded + 1;
                return {
                    ...oldState,
                    transactions: [ ...oldState.transactions, ...action.payload ],
                    loadingMore: false,
                    canLoadMore: true,
                    chunksLoaded: newChunksLoaded,
                 };
            case ActionType.NoItemsFound:
                 return{
                     ...oldState,
                     loadingMore: false,
                     canLoadMore: false,
                 };
            case ActionType.Error:
                return{
                    ...oldState,
                    loadingMore: false,
                    canLoadMore: false,
                };
        }
    };

    const initialTransactions = [0, 1, 2].map((i) => {
            const transaction = createEmptyTransaction();
            transaction.category = i;
            return transaction;
        });

    initialTransactions[2].date = "2019-03-07T12:30";

    const categories = ["Beer", "Wine", "Other"].map((item, index): ICategory => ({id: index, text: item }));
    const accounts = ["Cash", "Wallet", "Revolut"].map((item, index): IAccount => ({id: index, text: item }));

    const initialState = {
            transactions: initialTransactions,
            categories,
            accounts,
            loadingMore: false,
            canLoadMore: true,
            chunksLoaded: 1,
        };

    const [state, dispatch] = React.useReducer(reducer, initialState);

    const onRequestMoreTranscations = () => {
        dispatch({type: ActionType.LoadStart, payload: []});
        setTimeout(() => {
            if (state.chunksLoaded >= 6) {
                // this is intended to be called after the items in db (or page)
                // are exhausted
                dispatch({type: ActionType.NoItemsFound, payload: []});
                return;
            }

            const newTransactions: ITransaction[] = [];
            newTransactions.push(...[0, 1, 2, 3, 5].map((i) => {
                const transaction = createEmptyTransaction();
                transaction.category = Math.floor(Math.random() * 3);
                return transaction;
            }));
            dispatch({ type: ActionType.ItemsLoaded, payload: newTransactions });
        }, 1500);
    };

    return (
        <Paper className={classes.paper}>
            <TransactionList
                transactions={state.transactions}
                categories={state.categories}
                accounts={state.accounts}
                requestMoreTransactions={onRequestMoreTranscations}
                loading={state.loadingMore}
                canLoadMore={state.canLoadMore}
            />
        </Paper>
    );
};

export default withStyles(styles)(TransactionListContainer);

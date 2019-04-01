import { List, Paper, Theme } from "@material-ui/core";
import { Satellite } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import {
  createEmptyTransaction,
  IAccount,
  ICategory,
  ITransaction
} from "../../Models/TransactionModel";
import { getTransactionListChunk } from "../../Utilities/Api";
import TransactionList from "./TransactionList";

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    display: "block",
    // the child list fills the parent
    width: 360,
    marginTop: 32,
    marginBottom: 16,
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(360 + theme.spacing.unit * 3 * 2)]: {
      marginLeft: "auto",
      marginRight: "auto"
    }
  }
}));

enum ActionType {
  LoadStart = 1,
  ItemsLoaded,
  NoItemsFound,
  Error
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
const TransactionListContainer = () => {
  const reducer = (oldState: IState, action: IAction): IState => {
    switch (action.type) {
      case ActionType.LoadStart:
        return {
          ...oldState,
          loadingMore: true
        };
      case ActionType.ItemsLoaded:
        const newChunksLoaded = oldState.chunksLoaded + 1;
        return {
          ...oldState,
          transactions: [...oldState.transactions, ...action.payload],
          loadingMore: false,
          canLoadMore: true,
          chunksLoaded: newChunksLoaded
        };
      case ActionType.NoItemsFound:
        return {
          ...oldState,
          loadingMore: false,
          canLoadMore: false
        };
      case ActionType.Error:
        return {
          ...oldState,
          loadingMore: false,
          canLoadMore: false
        };
    }
  };

  const categories = ["Beer", "Wine", "Other"].map(
    (item, index): ICategory => ({ id: index, text: item })
  );
  const accounts = ["Cash", "Wallet", "Revolut"].map(
    (item, index): IAccount => ({ id: index, text: item })
  );

  const initialState = {
    transactions: [],
    categories,
    accounts,
    loadingMore: false,
    canLoadMore: true,
    chunksLoaded: 1
  };

  const [state, dispatch] = React.useReducer(reducer, initialState);

  const onRequestMoreTranscations = () => {
    console.log("Requested load more!");
    dispatch({ type: ActionType.LoadStart, payload: [] });
    // currently fetching relies on transactions being ordered chronologically:
    const lastLoadedTransactionDate =
      state.transactions.length > 0
        ? new Date(state.transactions[state.transactions.length - 1].date)
        : new Date();

    getTransactionListChunk(lastLoadedTransactionDate, 5).then(data => {
      if (data.length <= 0) {
        dispatch({ type: ActionType.NoItemsFound, payload: [] });
      } else {
        dispatch({ type: ActionType.ItemsLoaded, payload: data });
      }
    });
  };

  const classes = useStyles();

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

export default TransactionListContainer;

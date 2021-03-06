import { Paper, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React, { useEffect } from "react";
import { IAccount } from "../../Models/AccountModel";
import { IFilters } from "../../Models/TransactionFilterModel";
import { ICategory, ITransaction } from "../../Models/TransactionModel";
import { getTransactionListChunk } from "../../Utilities/Api";
import TransactionList from "./TransactionList";

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    display: "block",
    wdith: "100%",
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
  Error,
  ResetTransactionState,
  TransactionDeleted
}

interface IAction {
  type: ActionType;
  payload: ITransaction[] | [];
}

interface IState {
  transactions: ITransaction[];
  canLoadMore: boolean;
  loadingMore: boolean;
}

interface IProps {
  categories: ICategory[];
  accounts: IAccount[];
  filters: IFilters;
}

const activeRequests: AbortController[] = [];

// this component should load list elements dynamically,
// and (maybe later) support pagination
const TransactionListContainer = ({
  categories,
  accounts,
  filters
}: IProps) => {
  const initialState = {
    transactions: [],
    loadingMore: false,
    canLoadMore: true
  };

  const reducer = (oldState: IState, action: IAction): IState => {
    switch (action.type) {
      case ActionType.TransactionDeleted:
        const filteredTransactions = oldState.transactions.filter(
          t => t.id !== action.payload[0].id
        );
        return {
          ...oldState
          // transactions: filteredTransactions,
        };
      case ActionType.LoadStart:
        return {
          ...oldState,
          loadingMore: true
        };
      case ActionType.ItemsLoaded:
        return {
          ...oldState,
          transactions: [...oldState.transactions, ...action.payload],
          loadingMore: false,
          canLoadMore: true
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
      case ActionType.ResetTransactionState:
        return initialState;
    }
  };

  // This is called when user successfully deletes
  // a transaction and the UI needs to be updated
  // (the deleted transaction removed)
  const transactionDeletedCallback = (id: string) => {
    const transactionToBeRemoved = state.transactions.find(t => t.id === id);
    if (transactionToBeRemoved !== undefined) {
      dispatch({
        type: ActionType.TransactionDeleted,
        payload: [transactionToBeRemoved]
      });
    }
  };

  const [state, dispatch] = React.useReducer(reducer, initialState);

  const onRequestMoreTranscations = () => {
    dispatch({ type: ActionType.LoadStart, payload: [] });
    // currently fetching relies on transactions being ordered chronologically:
    const lastLoadedTransactionDate =
      state.transactions.length > 0
        ? new Date(state.transactions[state.transactions.length - 1].date)
        : new Date();

    const controller = new AbortController();
    const { signal } = controller;
    activeRequests.push(controller);
    getTransactionListChunk(lastLoadedTransactionDate, 5, filters, signal)
      .then(data => {
        // Remove controller from active requests
        if (data.length <= 0) {
          dispatch({ type: ActionType.NoItemsFound, payload: [] });
        } else {
          dispatch({ type: ActionType.ItemsLoaded, payload: data });
        }
      })
      .catch(e => {
        if (e.name !== "AbortError") {
          throw e;
        }
      });
  };

  useEffect(() => {
    activeRequests.forEach(controller => controller.abort());
    // Clear array
    activeRequests.splice(0, activeRequests.length);
    dispatch({ type: ActionType.ResetTransactionState, payload: [] });
  }, [filters]);

  const classes = useStyles();

  return (
    <Paper className={classes.paper}>
      <TransactionList
        transactions={state.transactions}
        categories={categories}
        accounts={accounts}
        requestMoreTransactions={onRequestMoreTranscations}
        loading={state.loadingMore}
        canLoadMore={state.canLoadMore}
        onTransactionDeleted={transactionDeletedCallback}
      />
    </Paper>
  );
};

export default TransactionListContainer;

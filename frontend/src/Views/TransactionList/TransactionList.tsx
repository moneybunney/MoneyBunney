import { Collapse, List, Paper, Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import React from "react";
import {
  IAccount,
  ICategory,
  ITransaction
} from "../../Models/TransactionModel";
import TransactionListItem from "./TransactionListItem";
import TransactionListLoadingItem from "./TransactionListLoadingItem";

const useStyles = makeStyles((theme: Theme) => ({
  listRoot: {
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    paddingTop: 0,
    paddingBottom: 0
  }
}));

interface IProps {
  transactions: ITransaction[];
  accounts: IAccount[];
  categories: ICategory[];
  requestMoreTransactions: () => void;
  canLoadMore: boolean;
  loading: boolean;
}

const TransactionList = ({
  transactions,
  accounts,
  categories,
  requestMoreTransactions,
  canLoadMore = true,
  loading = true
}: IProps) => {
  const triggerChild = React.useRef<HTMLSpanElement>(null);
  React.useEffect(() => {
    window.addEventListener("scroll", checkIfShouldLoadMore);
    return () => {
      window.removeEventListener("scroll", checkIfShouldLoadMore);
    };
  });

  React.useEffect(() => {
    // called on initial load and every change of transactions thereafter
    checkIfShouldLoadMore();
  }, [transactions]);

  const isAtBottom = (): boolean => {
    if (triggerChild && triggerChild.current) {
      const triggerElem = triggerChild.current;
      return triggerElem!!.getBoundingClientRect().bottom <= window.innerHeight;
    }
    return false;
  };

  const checkIfShouldLoadMore = () => {
    if (canLoadMore && !loading) {
      if (isAtBottom()) {
        requestMoreTransactions();
      }
    }
  };

  const classes = useStyles();

  return (
    <List className={classes.listRoot}>
      {transactions.map((t, i) => (
        <TransactionListItem
          key={"transaction_" + i}
          transaction={t}
          categoryText={categories[t.category].text}
          accountText={accounts[t.account].text}
        />
      ))}
      <Collapse in={loading}>
        <TransactionListLoadingItem />
      </Collapse>
      <span ref={triggerChild} />
    </List>
  );
};

export default TransactionList;

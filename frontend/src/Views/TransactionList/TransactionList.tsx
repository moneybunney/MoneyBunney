import { Collapse, createStyles, List, Paper, Theme, WithStyles, withStyles} from "@material-ui/core";
import React from "react";
import ITransaction, { IAccount, ICategory } from "../../Models/TransactionModel";
import TransactionListItem from "./TransactionListItem";
import TransactionListLoadingItem from "./TransactionListLoadingItem";

const styles = (theme: Theme) => createStyles({
    listRoot: {
        width: "100%",
        backgroundColor: theme.palette.background.paper,
        paddingTop: 0,
        paddingBottom: 0,
    },
});

interface IProps extends WithStyles<typeof styles> {
    transactions: ITransaction[];
    accounts: IAccount[];
    categories: ICategory[];
    requestMoreTransactions: () => void;
    canLoadMore?: boolean;
    loading?: boolean;
}

class TransactionList extends React.Component<IProps, any> {
    constructor(props: IProps) {
        super(props);
        if (props.loading === undefined) {
            props.loading = true;
        }
    }

    public componentDidMount() {
        window.addEventListener("scroll", this.checkIfShouldLoadMore);

        // in case the element is already on screen but not yet loaded
        this.checkIfShouldLoadMore();
    }

    public componentDidUpdate(prevProps: IProps) {
        // after each sequential load is finished, check
        // if the user sees the bottom of the list
        if (this.props.transactions.length !== prevProps.transactions.length) {
            this.checkIfShouldLoadMore();
        }
    }

    public componentWillUnmount() {
        window.removeEventListener("scroll", this.checkIfShouldLoadMore);
    }

    public isAtBottom = () => {
        const triggerElem = document.getElementById("transactionListLoaderTriggerItem");
        return triggerElem!!.getBoundingClientRect().bottom <= window.innerHeight;
    }

    public checkIfShouldLoadMore = () => {
        if (this.props.canLoadMore && !this.props.loading) {
            if (this.isAtBottom()) {
                this.props.requestMoreTransactions();
            }
        }
    }

    public render() {
        return(
            <List className={this.props.classes.listRoot} >
                {this.props.transactions.map((t, i) =>
                <TransactionListItem
                    key={"transaction_" + i}
                    transaction={t}
                    categoryText={this.props.categories[t.category].text}
                    accountText={this.props.accounts[t.account].text}
                />)}
                  <Collapse in={this.props.loading}>
                    <TransactionListLoadingItem/>
                  </Collapse>
                  <span id="transactionListLoaderTriggerItem"/>
            </List >
        );
    }
}

export default withStyles(styles)(TransactionList);

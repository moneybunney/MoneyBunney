import { createStyles, Theme, WithStyles, withStyles } from "@material-ui/core";
import React from "react";

const styles = (theme: Theme) => createStyles({

});

interface IProps extends WithStyles<typeof styles> {
}

const TransactionList = (props: IProps) => {
    return (
        <div>Hello transaction list!</div>
    );
};

export default withStyles(styles)(TransactionList);

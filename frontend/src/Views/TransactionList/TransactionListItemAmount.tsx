import { createStyles, ListItemSecondaryAction, Theme, Typography, WithStyles, withStyles } from "@material-ui/core";
import React from "react";

const styles = (theme: Theme) => createStyles({
    amountText: {
        fontWeight: 500,
        margin: 16,
    },
    spending: {
        color: "#f6787f",
    },
    gain: {
        color: "#68bcbe",
    },
});

interface IProps extends WithStyles<typeof styles> {
    amount: number;
}

const TransactionListItemAmount = ({amount: amount, classes}: IProps) => {
    const spending = amount < 0;
    const amountText =
        (spending ? "-" : "+") + " " + Math.abs(amount).toFixed(2) + "€";
    return (
        <ListItemSecondaryAction>
            <Typography className={classes.amountText}>
                <span className={spending ? classes.spending : classes.gain}>{amountText}</span>
            </Typography>
        </ListItemSecondaryAction>
    );
};

export default withStyles(styles)(TransactionListItemAmount);

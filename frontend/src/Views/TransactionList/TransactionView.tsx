import {
  createStyles,
  Fab,
  Theme,
  withStyles,
  WithStyles
} from "@material-ui/core";
import { Add } from "@material-ui/icons";
import React from "react";
import useReactRouter from "use-react-router";

import TransactionListContainer from "./TransactionListContainer";

const styles = (theme: Theme) =>
  createStyles({
    fab: {
      position: "fixed",
      bottom: theme.spacing.unit * 10,
      right: theme.spacing.unit * 10
    }
  });

interface IProps extends WithStyles<typeof styles> {}

const TransactionView = ({ classes }: IProps) => {
  const { history } = useReactRouter();
  const onClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.preventDefault();
    history.replace("/transactions/create");
  };

  return (
    <React.Fragment>
      <TransactionListContainer />
      <Fab
        onClick={onClick}
        color="primary"
        className={classes.fab}
        aria-label="Add"
      >
        <Add />
      </Fab>
    </React.Fragment>
  );
};

export default withStyles(styles)(TransactionView);

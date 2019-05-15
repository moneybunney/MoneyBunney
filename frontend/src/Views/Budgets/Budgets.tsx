import React from "react";
import { Fab, Paper, Theme } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import useReactRouter from "use-react-router";
import LinearProgress from "@material-ui/core/LinearProgress";
import AccountList from "../../Components/AccountList/AccountList";
import { BudgetsCreateLocation } from "../../routes.constants";
import ProgressBar from "../../Components/ProgressBar";

const useStyles = makeStyles((theme: Theme) => ({
  fab: {
    position: "fixed",
    bottom: theme.spacing.unit * 10,
    right: theme.spacing.unit * 10
  }
}));

const Budgets = () => {
  const { history } = useReactRouter();
  const classes = useStyles();

  const onClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.preventDefault();
    history.replace(BudgetsCreateLocation);
  };

  return (
    <>
      <ProgressBar capacity={100} load={79} />
      <Fab
        onClick={onClick}
        color="primary"
        className={classes.fab}
        aria-label="Add"
      >
        <Add />
      </Fab>
    </>
  );
};

export default Budgets;

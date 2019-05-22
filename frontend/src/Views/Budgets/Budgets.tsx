import React from "react";
import { Fab, Paper, Theme } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import useReactRouter from "use-react-router";
import LinearProgress from "@material-ui/core/LinearProgress";
import { BudgetsCreateLocation } from "../../routes.constants";
import ProgressBar from "../../Components/ProgressBar";
import BudgetList from "../../Components/BudgetList/BudgetList";
import { IBudget } from "../../Models/BudgetModel";

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    display: "block",
    // the child list fills the parent
    width: "90%",
    marginTop: 32,
    marginBottom: 16,
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(360 + theme.spacing.unit * 3 * 2)]: {
      marginLeft: "auto",
      marginRight: "auto"
    },
    overflow: "auto"
  },
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
      <Paper className={classes.paper}>
        <BudgetList />
      </Paper>
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

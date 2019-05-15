import React from "react";
import { Fab, Paper, Theme } from "@material-ui/core";
import { Add } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import useReactRouter from "use-react-router";
import LinearProgress from "@material-ui/core/LinearProgress";
import AccountList from "../../Components/AccountList/AccountList";
import { BudgetsCreateLocation } from "../../routes.constants";
import ProgressBar from "../../Components/ProgressBar";
import BudgetListItem from "../../Components/BudgetList/BudgetListItem";
import { IBudget } from "../../Models/BudgetModel";

const useStyles = makeStyles((theme: Theme) => ({
  fab: {
    position: "fixed",
    bottom: theme.spacing.unit * 10,
    right: theme.spacing.unit * 10
  }
}));

const test: IBudget = {
  id: "test",
  category: "Kategorija",
  amount: 200,
  startDate: "2019-05-10T19:12",
  endDate: "2019-05-20T19:12"
};

const Budgets = () => {
  const { history } = useReactRouter();
  const classes = useStyles();

  const onClick = (event: React.MouseEvent<HTMLElement, MouseEvent>) => {
    event.preventDefault();
    history.replace(BudgetsCreateLocation);
  };

  return (
    <>
      <BudgetListItem budget={test} categoryText={"Kategorija"} load={150} />
      <BudgetListItem budget={test} categoryText={"Kita"} load={220} />
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

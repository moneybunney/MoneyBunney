import React from "react";

import { Grid, Paper, Theme, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

import AccountList from "../../Components/AccountList/AccountList";
import BudgetList from "../../Components/BudgetList/BudgetList";
import CategoryPie from "../../Components/Charts/CategoryPie";
import DashboardStatisticList from "./DashboardStatisticList";

const useStyles = makeStyles((theme: Theme) => ({
  paper: {
    maxHeight: "40vh",
    overflow: "auto"
  },
  title: {
    marginBottom: "12px"
  }
}));

const Dashboard = () => {
  const classes = useStyles();
  return (
    <Grid container={true} spacing={32}>
      <Grid item={true} md={6} xs={12}>
        <Typography className={classes.title} variant={"h4"}>
          Accounts
        </Typography>
        <Paper className={classes.paper}>
          <AccountList />
        </Paper>
      </Grid>
      <Grid item={true} md={6} xs={12}>
        <Typography className={classes.title} variant={"h4"}>
          Statistics
        </Typography>
        <Paper className={classes.paper}>
          <DashboardStatisticList />
        </Paper>
      </Grid>
      <Grid item={true} md={6} xs={12}>
        <Typography className={classes.title} variant={"h4"}>
          Budgets
        </Typography>
        <Paper className={classes.paper}>
          <BudgetList />
        </Paper>
      </Grid>
      <Grid item={true} md={6} xs={12}>
        <Typography className={classes.title} variant={"h4"}>
          Expenses by category
        </Typography>
        <CategoryPie />
      </Grid>
    </Grid>
  );
};

export default Dashboard;

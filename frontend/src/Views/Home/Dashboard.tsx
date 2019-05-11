import React from "react";

import { Grid, Paper, Theme, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

import AccountList from "../Accounts/AccountList";
import CategoryPie from "../Reports/CategoryPie";
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
      <Grid item={true} xs={6}>
        <Typography className={classes.title} variant={"h4"}>
          Accounts
        </Typography>
        <Paper className={classes.paper}>
          <AccountList />
        </Paper>
      </Grid>
      <Grid item={true} xs={6}>
        <Typography className={classes.title} variant={"h4"}>
          Statistics
        </Typography>
        <Paper className={classes.paper}>
          <DashboardStatisticList />
        </Paper>
      </Grid>
      <Grid item={true} xs={6}>
        <Typography className={classes.title} variant={"h4"}>
          Budgets
        </Typography>
        <Paper className={classes.paper}>
          <Typography variant={"h5"} style={{ margin: "15px" }}>
            TBD
          </Typography>
        </Paper>
      </Grid>
      <Grid item={true} xs={6}>
        <Typography className={classes.title} variant={"h4"}>
          Expenses by category
        </Typography>
        <CategoryPie />
      </Grid>
    </Grid>
  );
};

export default Dashboard;

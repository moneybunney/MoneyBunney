import React from "react";

import { Grid, Paper, Theme, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import AccountList from "../Accounts/AccountList";
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
    <Grid container={true} spacing={24}>
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
    </Grid>
  );
};

export default Dashboard;

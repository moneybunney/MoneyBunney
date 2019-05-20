import React from "react";

import { Grid, Theme, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

import CashFlowChart from "../../Components/Charts/CashFlowChart";
import CategoryPie from "../../Components/Charts/CategoryPie";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    flexGrow: 1
  }
}));

const Reports = () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Typography component="div" className={classes.root}>
        <Grid container={true} spacing={24}>
          <Grid item={true} xs={6}>
            <h1>Expenses by category chart</h1>
            <CategoryPie />
          </Grid>
          <Grid item={true} xs={6}>
            <h1>Cash flow chart</h1>
            <CashFlowChart numberOfMonths={5} />
          </Grid>
        </Grid>
      </Typography>
    </React.Fragment>
  );
};

export default Reports;

import React from "react";
import BarChart from "./BarChart";
import CategoryPie from "./CategoryPie";

import { Grid, Theme, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

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
            <h1>Favourite pies</h1>
            <BarChart />
          </Grid>
        </Grid>
      </Typography>
    </React.Fragment>
  );
};

export default Reports;

import React from "react";
import PieChart from "./PieChart";

import { Theme, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme: Theme) => ({
  chartContainer: {
    marginLeft: -30
  }
}));

const Reports = () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <h1>Favourite bars</h1>
      <Typography component="div" className={classes.chartContainer}>
        <PieChart />
      </Typography>
    </React.Fragment>
  );
};

export default Reports;

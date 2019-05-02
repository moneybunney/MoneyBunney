import React from "react";
import SimpleLineChart from "./SimpleLineChart";

import { Theme, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) => ({
  chartContainer: {
    marginLeft: -22
  }
}));

const Dashboard = () => {
  const classes = useStyles();
  return (
    <React.Fragment>
      <h1>Monthly Sales Data</h1>
      <Typography component="div" className={classes.chartContainer}>
        <SimpleLineChart />
      </Typography>
    </React.Fragment>
  );
};

export default Dashboard;

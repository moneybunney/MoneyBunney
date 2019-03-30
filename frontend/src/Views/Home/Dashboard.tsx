import React from "react";
import SimpleLineChart from "./SimpleLineChart";

import {
  createStyles,
  Theme,
  Typography,
  withStyles,
  WithStyles
} from "@material-ui/core";
import { Link } from "react-router-dom";

const styles = (theme: Theme) =>
  createStyles({
    chartContainer: {
      marginLeft: -22
    }
  });

export interface IProps extends WithStyles<typeof styles> {}

const Dashboard = ({ classes }: IProps) => {
  return (
    <React.Fragment>
      <h1>Monthly Sales Data</h1>
      <Typography component="div" className={classes.chartContainer}>
        <SimpleLineChart />
      </Typography>
    </React.Fragment>
  );
};

export default withStyles(styles)(Dashboard);

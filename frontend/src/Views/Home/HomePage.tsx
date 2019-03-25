import PropTypes from "prop-types";
import React from "react";
import Header from "./Header";
import SimpleLineChart from "./SimpleLineChart";

import {
  createStyles,
  Drawer,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Theme,
  Typography,
  withStyles,
  WithStyles
} from "@material-ui/core";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from "recharts";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: "flex"
    },
    appBarSpacer: theme.mixins.toolbar,
    chartContainer: {
      marginLeft: -22
    },
    content: {
      flexGrow: 1,
      height: "100vh",
      overflow: "auto",
      padding: theme.spacing.unit * 3
    },
    toolbar: {
      paddingRight: 24
    }
  });

export interface IProps extends WithStyles<typeof styles> {}

const HomePage = ({ classes }: IProps) => {
  return (
    <div className={classes.root}>
      <Header />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <h1>Monthly Sales Data</h1>
        <Typography component="div" className={classes.chartContainer}>
          <SimpleLineChart />
        </Typography>
      </main>
    </div>
  );
};

export default withStyles(styles)(HomePage);

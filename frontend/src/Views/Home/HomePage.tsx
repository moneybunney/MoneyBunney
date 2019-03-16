import React from 'react'
import PropTypes from 'prop-types';
import Header from "./Header";
import SimpleLineChart from "./SimpleLineChart";

import {
    Theme, withStyles, WithStyles, Paper, Table, TableHead, TableRow,
    TableCell, TableBody, TablePagination, Grid, Typography,
    Drawer, createStyles
} from '@material-ui/core';

import {
  BarChart, CartesianGrid, XAxis,
  YAxis, Bar, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
    },
    appBarSpacer: theme.mixins.toolbar,
    chartContainer: {
      marginLeft: -22,
    },
    content: {
      flexGrow: 1,
      height: '100vh',
      overflow: 'auto',
      padding: theme.spacing.unit * 3,
    },
    toolbar: {
      paddingRight: 24,
    }
  });

export interface Props extends WithStyles<typeof styles> {}

class HomePage extends React.Component<Props> {

  public render() {
      const { classes } = this.props;
          return (
            <React.Fragment>
            <div className={classes.root}>
              <Header/>
              <main className={classes.content}>
                <div className={classes.appBarSpacer} />
                <h1>Monthly Sales Data</h1>
                  <Typography component="div" className={classes.chartContainer}>
                    <SimpleLineChart />
                  </Typography>
                </main>
               </div>
              </React.Fragment>
          );
      }
}

(HomePage as React.ComponentClass<Props>).propTypes = {
  classes: PropTypes.object.isRequired,
} as any;

export default withStyles(styles)(HomePage);

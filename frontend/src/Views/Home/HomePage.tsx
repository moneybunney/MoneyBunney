import React from "react";
import NavigationWrapper from "../../Components/NavigationWrapper/NavigationWrapper";
import SimpleLineChart from "./SimpleLineChart";

import {
  createStyles,
  Theme,
  Typography,
  withStyles,
  WithStyles
} from "@material-ui/core";

const styles = (theme: Theme) =>
  createStyles({
    appBarSpacer: theme.mixins.toolbar,
    chartContainer: {
      marginLeft: -22
    },
    content: {
      flexGrow: 1,
      height: "100vh",
      overflow: "auto",
      padding: theme.spacing.unit * 3
    }
  });

export interface IProps extends WithStyles<typeof styles> {}

const HomePage = ({ classes }: IProps) => {
  return (
    <NavigationWrapper>
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        <h1>Monthly Sales Data</h1>
        <Typography component="div" className={classes.chartContainer}>
          <SimpleLineChart />
        </Typography>
      </main>
    </NavigationWrapper>
  );
};

export default withStyles(styles)(HomePage);

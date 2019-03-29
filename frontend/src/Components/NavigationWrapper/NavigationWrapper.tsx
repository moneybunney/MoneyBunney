import React from "react";

import { createStyles, Theme, withStyles, WithStyles } from "@material-ui/core";

import LogOutButton from "../LogOutButton";
import NavigationSidebar from "./NavigationSidebar";
import PageHeader from "./PageHeader";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
      flexGrow: 1,
      height: "100vh",
      overflow: "auto",
      padding: theme.spacing.unit * 3,
    },
  });

export interface IProps extends WithStyles<typeof styles> {
  children?: any;
}

const NavigationWrapper = ({ classes, children }: IProps) => {
  return (
    <div className={classes.root}>
      <PageHeader text="Dashboard" />
      <NavigationSidebar />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        {children}
      </main>
    </div>
  );
};

export default withStyles(styles)(NavigationWrapper);

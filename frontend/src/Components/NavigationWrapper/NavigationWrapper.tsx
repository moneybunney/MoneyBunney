import React, { ReactNode } from "react";

import { createStyles, Theme, withStyles, WithStyles } from "@material-ui/core";

import LogOutButton from "../LogOutButton";
import NavigationSidebar from "./NavigationSidebar";
import PageHeader from "./PageHeader";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: "flex"
    }
  });

export interface IProps extends WithStyles<typeof styles> {
  children?: any;
}

const NavigationWrapper = ({ classes, children }: IProps) => {
  return (
    <div className={classes.root}>
      <PageHeader text="Dashboard" />
      <NavigationSidebar />
      {children}
    </div>
  );
};

export default withStyles(styles)(NavigationWrapper);

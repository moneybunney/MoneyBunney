import React, { ReactElement } from "react";

import { Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

import NavigationSidebar from "./NavigationSidebar";
import PageHeader from "./PageHeader";

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: "flex"
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: "100vh",
    padding: theme.spacing.unit * 3
  }
}));

export interface IProps {
  children?: ReactElement;
}

const NavigationWrapper = ({ children }: IProps) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <PageHeader />
      <NavigationSidebar />
      <main className={classes.content}>
        <div className={classes.appBarSpacer} />
        {children}
      </main>
    </div>
  );
};

export default NavigationWrapper;

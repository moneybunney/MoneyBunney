import React from "react";

import { AppBar, Theme, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";

import { Route, Switch } from "react-router";
import {
  AccountsLocation,
  BudgetsLocation,
  DashboardLocation,
  ReportsLocation,
  TransactionsLocation
} from "../../routes.constants";
import LogOutButton from "../LogOutButton";

const drawerWidth = 240;
const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth
  },
  title: {
    flexGrow: 1
  }
}));

const PageHeader = () => {
  const classes = useStyles();

  return (
    <AppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <Typography
          variant="h6"
          color="inherit"
          noWrap={true}
          className={classes.title}
        >
          <Switch>
            <Route path={TransactionsLocation} render={() => "Transactions"} />
            <Route path={DashboardLocation} render={() => "Dashboard"} />
            <Route path={AccountsLocation} render={() => "Accounts"} />
            <Route path={ReportsLocation} render={() => "Reports"} />
            <Route path={BudgetsLocation} render={() => "Budget"} />
            <Route path="/" render={() => "Dashboard"} />
          </Switch>
        </Typography>
        <LogOutButton />
      </Toolbar>
    </AppBar>
  );
};

export default PageHeader;

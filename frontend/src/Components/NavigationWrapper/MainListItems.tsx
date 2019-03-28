import {
  AccountBalance,
  BarChart,
  Dashboard,
  Layers
} from "@material-ui/icons";
import React from "react";
import NavigationListItem from "./NavigationListItem";

export const MainListItems = () => (
  <React.Fragment>
    <NavigationListItem text="Dashboard">
      <Dashboard />
    </NavigationListItem>
    <NavigationListItem text="Balance">
      <AccountBalance />
    </NavigationListItem>
    <NavigationListItem text="Reports">
      <BarChart />
    </NavigationListItem>
    <NavigationListItem text="Transactions">
      <Layers />
    </NavigationListItem>
  </React.Fragment>
);

export default MainListItems;

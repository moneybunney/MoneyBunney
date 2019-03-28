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
    <NavigationListItem text="Dashboard" route="/dashboard">
      <Dashboard />
    </NavigationListItem>
    <NavigationListItem text="Balance" route="/balance">
      <AccountBalance />
    </NavigationListItem>
    <NavigationListItem text="Reports" route="/reports">
      <BarChart />
    </NavigationListItem>
    <NavigationListItem text="Transactions" route="/transactions">
      <Layers />
    </NavigationListItem>
  </React.Fragment>
);

export default MainListItems;

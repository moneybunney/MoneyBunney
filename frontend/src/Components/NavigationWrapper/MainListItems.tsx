import {
  AccountBalanceWallet,
  BarChart,
  Dashboard,
  ShoppingBasket,
  SwapHoriz
} from "@material-ui/icons";
import React from "react";
import NavigationListItem from "./NavigationListItem";

export const MainListItems = () => (
  <React.Fragment>
    <NavigationListItem text="Dashboard" route="/dashboard">
      <Dashboard />
    </NavigationListItem>
    <NavigationListItem text="Transactions" route="/transactions">
      <SwapHoriz />
    </NavigationListItem>
    <NavigationListItem text="Accounts" route="/accounts">
      <AccountBalanceWallet />
    </NavigationListItem>
    <NavigationListItem text="Reports" route="/reports">
      <BarChart />
    </NavigationListItem>
    <NavigationListItem text="Budget" route="/budget">
      <ShoppingBasket />
    </NavigationListItem>
  </React.Fragment>
);

export default MainListItems;

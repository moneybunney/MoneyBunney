import {
  AccountBalanceWallet,
  BarChart,
  Dashboard,
  ShoppingBasket,
  SwapHoriz
} from "@material-ui/icons";
import React from "react";
import {
  AccountsLocation,
  BudgetsLocation,
  DashboardLocation,
  ReportsLocation,
  TransactionsLocation
} from "../../routes";
import NavigationListItem from "./NavigationListItem";

export const MainListItems = () => (
  <React.Fragment>
    <NavigationListItem text="Dashboard" route={DashboardLocation}>
      <Dashboard />
    </NavigationListItem>
    <NavigationListItem text="Transactions" route={TransactionsLocation}>
      <SwapHoriz />
    </NavigationListItem>
    <NavigationListItem text="Accounts" route={AccountsLocation}>
      <AccountBalanceWallet />
    </NavigationListItem>
    <NavigationListItem text="Reports" route={ReportsLocation}>
      <BarChart />
    </NavigationListItem>
    <NavigationListItem text="Budget" route={BudgetsLocation}>
      <ShoppingBasket />
    </NavigationListItem>
  </React.Fragment>
);

export default MainListItems;

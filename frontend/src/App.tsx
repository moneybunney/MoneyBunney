import { SnackbarProvider } from "notistack";
import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from "react-router-dom";

import {
  AccountsCreateLocation,
  AccountsLocation,
  DashboardLocation,
  LoginLocation,
  RegisterLocation,
  ReportsLocation,
  TransactionsCreateLocation,
  TransactionsLocation,
  BudgetsLocation,
  BudgetsCreateLocation
} from "./routes.constants";

import AccountCreation from "./Views/AccountCreation/AccountCreation";
import Accounts from "./Views/Accounts/Accounts";
import Checkout from "./Views/Checkout/Checkout";
import Dashboard from "./Views/Home/Dashboard";
import Login from "./Views/Login/Login";
import Register from "./Views/Register/Register";
import Reports from "./Views/Reports/Reports";
import TransactionView from "./Views/TransactionList/TransactionView";
import Budgets from "./Views/Budgets/Budgets";
import BudgetCreation from "./Views/BudgetCreation/BudgetCreation";

import NavigationWrapper from "./Components/NavigationWrapper/NavigationWrapper";
import GuestRoute from "./Components/routes/GuestRoute";
import UserRoute from "./Components/routes/UserRoute";

import withMaterialUiRoot from "./withMaterialUiRoot";

const HomeRoutes = () => {
  return (
    <NavigationWrapper>
      <Switch>
        <Route
          exact={true}
          path={TransactionsLocation}
          component={TransactionView}
        />
        <Route exact={true} path={AccountsLocation} component={Accounts} />
        <Route path={AccountsCreateLocation} component={AccountCreation} />
        <Route path={TransactionsCreateLocation} component={Checkout} />
        <Route path={DashboardLocation} component={Dashboard} />
        <Route path={ReportsLocation} component={Reports} />
        <Route exact={true} path={BudgetsLocation} component={Budgets} />
        <Route path={BudgetsCreateLocation} component={BudgetCreation} />
        <Redirect to={DashboardLocation} />
      </Switch>
    </NavigationWrapper>
  );
};

const App = () => {
  return (
    <SnackbarProvider maxSnack={1}>
      <Router>
        <Switch>
          <GuestRoute path={LoginLocation} Component={Login} />
          <GuestRoute path={RegisterLocation} Component={Register} />
          <UserRoute path="/" Component={HomeRoutes} />
        </Switch>
      </Router>
    </SnackbarProvider>
  );
};

export default withMaterialUiRoot(App);

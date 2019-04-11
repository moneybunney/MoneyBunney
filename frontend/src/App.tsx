import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from "react-router-dom";

import Accounts from "./Views/Accounts/Accounts";
import Checkout from "./Views/Checkout/Checkout";
import Dashboard from "./Views/Home/Dashboard";
import Login from "./Views/Login/Login";
import Register from "./Views/Register/Register";
import TransactionView from "./Views/TransactionList/TransactionView";

import NavigationWrapper from "./Components/NavigationWrapper/NavigationWrapper";
import GuestRoute from "./Components/routes/GuestRoute";
import UserRoute from "./Components/routes/UserRoute";

import withMaterialUiRoot from "./withMaterialUiRoot";

const HomeRoutes = () => {
  return (
    <NavigationWrapper>
      <Switch>
        <Route exact={true} path="/transactions" component={TransactionView} />
        <Route path="/transactions/create" component={Checkout} />
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/accounts" component={Accounts} />
        <Redirect to="/dashboard" />
      </Switch>
    </NavigationWrapper>
  );
};

const App = () => {
  return (
    <Router>
      <Switch>
        <GuestRoute path="/login" Component={Login} />
        <GuestRoute path="/register" Component={Register} />
        <UserRoute path="/" Component={HomeRoutes} />
      </Switch>
    </Router>
  );
};

export default withMaterialUiRoot(App);

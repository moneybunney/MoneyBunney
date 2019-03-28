import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from "react-router-dom";

import Checkout from "./Views/Checkout/Checkout";
import Dasbhoard from "./Views/Home/Dashboard";
import Login from "./Views/Login/Login";
import Register from "./Views/Register/Register";
import TransactionListContainer from "./Views/TransactionList/TransactionListContainer";

import GuestRoute from "./Components/routes/GuestRoute";
import UserRoute from "./Components/routes/UserRoute";
import NavigationWrapper from "./Components/NavigationWrapper/NavigationWrapper";

const HomeRoutes = () => {
  return (
    <NavigationWrapper>
      <Switch>
        <Route path="/transactions" component={TransactionListContainer} />
        <Route path="/checkout" component={Checkout} />
        <Route exact={true} path="/" component={Dasbhoard} />
        <Redirect to="/" />
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
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default App;

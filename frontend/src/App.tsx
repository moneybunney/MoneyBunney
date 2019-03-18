import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import Checkout from "./Views/Checkout/Checkout";
import HomePage from "./Views/Home/HomePage";
import Login from "./Views/Login/Login";
import Register from "./Views/Register/Register";
import TransactionListContainer from "./Views/TransactionList/TransactionListContainer";

import GuestRoute from "./Components/routes/GuestRoute";
import UserRoute from "./Components/routes/UserRoute";

const App = () => {
  return (
    <Router>
      <Switch>
        <UserRoute exact={true} path="/" Component={HomePage} />
        <GuestRoute path="/login" Component={Login} />
        <GuestRoute path="/register" Component={Register} />
        <UserRoute path="/checkout" Component={Checkout} />
        <UserRoute path="/list" Component={TransactionListContainer} />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default App;

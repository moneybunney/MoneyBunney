import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch
} from "react-router-dom";

import Checkout from "./Views/Checkout/Checkout";
import Login from "./Views/Login/Login";
import Register from "./Views/Register/Register";
import TransactionListContainer from "./Views/TransactionList/TransactionListContainer";

import LogOutButton from "./Components/LogOutButton";
import GuestRoute from "./Components/routes/GuestRoute";
import UserRoute from "./Components/routes/UserRoute";

const App = () => {
  return (
    <Router>
      <Switch>
        <UserRoute exact={true} path="/" Component={LogOutButton} />
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

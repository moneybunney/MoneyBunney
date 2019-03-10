import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";

import Checkout from "./Views/Checkout/Checkout";
import Login from "./Views/Login/Login";
import Register from "./Views/Register/Register";
import TransactionListContainer from "./Views/TransactionList/TransactionListContainer";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact={true} path="/" component={Login} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/checkout" component={Checkout} />
        <Route path="/list" component={TransactionListContainer} />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default App;

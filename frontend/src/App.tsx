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

import RouteWithAuthentication from "./Components/RouteWithAuthentication";

const DummyMainPage = () => {
  return <div>Delete the cookies to see the login page</div>;
};

const App = () => {
  return (
    <Router>
      <Switch>
        <RouteWithAuthentication
          onlyLoggedIn={true}
          redirectRoute="/login"
          exact={true}
          path="/"
          Component={DummyMainPage}
        />
        <RouteWithAuthentication
          onlyLoggedIn={false}
          redirectRoute="/"
          path="/login"
          Component={Login}
        />
        <RouteWithAuthentication
          onlyLoggedIn={false}
          redirectRoute="/"
          path="/register"
          Component={Register}
        />
        <RouteWithAuthentication
          onlyLoggedIn={true}
          redirectRoute="/login"
          path="/checkout"
          Component={Checkout}
        />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default App;

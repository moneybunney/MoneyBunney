import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import Login from "./Views/Login";
import Register from "./Views/Register";

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact={true} path="/" component={Login} />
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />
      </Switch>
    </Router>
  );
};

export default App;

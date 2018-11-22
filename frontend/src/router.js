import React from "react";
import App from "./app/App";
import LoginPage from "./ui/containers/Login/Login";
import * as PATH from "./constants/routeConstants";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
export default (
  <Router>
    <Switch>
      <Route path={PATH.LOGIN_URL} component={LoginPage} />
      <Route
        exact
        path="/admin"
        render={() => <Redirect to="/admin/login" />}
      />
      <Route path={PATH.ADMIN_LOGIN_URL} component={LoginPage} />
      <Route path={PATH.HOME_URL} component={App} />
    </Switch>
  </Router>
);

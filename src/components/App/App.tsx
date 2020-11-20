import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { Home, SignUp, SignIn, ResetPassword, LobbyRoutes } from "routes";
import { CssBaseline } from "@material-ui/core";
import "fontsource-roboto";

const App: React.FC = () => {
  return (
    <>
      <CssBaseline />
      <Router>
        <Switch>
          <Route path="/signup" component={SignUp} />
          <Route path="/signin" component={SignIn} />
          <Route path="/reset-password" component={ResetPassword} />
          <LobbyRoutes path="/lobby" />
          <Redirect exact from="/" to={"/lobby"} />
        </Switch>
      </Router>
    </>
  );
};

export default App;

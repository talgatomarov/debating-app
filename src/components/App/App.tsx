import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Home, SignUp, SignIn, ResetPassword, LobbyPage } from "routes";
import { CssBaseline } from "@material-ui/core";
import "fontsource-roboto";
import PrivateRoute from "components/PrivateRoute";

const App: React.FC = () => {
  return (
    <>
      <CssBaseline />
      <Router>
        <Switch>
          <Route path="/signup" component={SignUp} />
          <Route path="/signin" component={SignIn} />
          <PrivateRoute path="/lobby" component={LobbyPage} />
          <Route path="/reset-password" component={ResetPassword} />
          <Route exact path="/" component={Home} />
        </Switch>
      </Router>
    </>
  );
};

export default App;

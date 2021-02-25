import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import {
  SignUp,
  SignIn,
  ResetPassword,
  LobbyRoutes,
  Room,
  CreateRoom,
} from "routes";
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
          <Route path="/reset-password" component={ResetPassword} />
          <PrivateRoute exact path="/rooms/:roomId" component={Room} />
          <PrivateRoute exact path="/create-room/" component={CreateRoom} />
          <LobbyRoutes path="/lobby" />
          <Redirect exact from="/" to={"/lobby"} />
        </Switch>
      </Router>
    </>
  );
};

export default App;

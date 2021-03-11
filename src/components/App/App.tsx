import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { SignUp, SignIn, ResetPassword, Room, CreateRoom, Lobby } from "routes";
import { CssBaseline } from "@material-ui/core";
import "fontsource-roboto";
import PrivateRoute from "components/PrivateRoute";
import { StoresProvider } from "contexts";

const App: React.FC = () => {
  return (
    <>
      <StoresProvider>
        <CssBaseline />
        <Router>
          <Switch>
            <Route path="/signup" component={SignUp} />
            <Route path="/signin" component={SignIn} />
            <Route path="/reset-password" component={ResetPassword} />
            <PrivateRoute exact path="/room" component={Room} />
            <PrivateRoute exact path="/create-room" component={CreateRoom} />
            <PrivateRoute exact path="/lobby" component={Lobby} />
            <Redirect exact from="/" to={"/lobby"} />
          </Switch>
        </Router>
      </StoresProvider>
    </>
  );
};

export default App;

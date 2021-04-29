import PrivateRoute from "components/PrivateRoute";
import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { CreateRoom, Lobby, ResetPassword, Room, SignIn, SignUp } from "routes";

const Router: React.FC = () => {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/signup" component={SignUp} />
        <Route path="/signin" component={SignIn} />
        <Route path="/reset-password" component={ResetPassword} />
        <PrivateRoute exact path="/room" component={Room} />
        <PrivateRoute exact path="/create-room" component={CreateRoom} />
        <PrivateRoute exact path="/lobby" component={Lobby} />
        <Redirect exact from="/" to={"/lobby"} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;

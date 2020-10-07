import React from "react";
import { RouteProps } from "react-router-dom";
import LobbyRootPage from "./LobbyRootPage";
import PrivateRoute from "components/PrivateRoute";
import CreateRoom from "./CreateRoom";

const LobbyRoutes: React.FC<RouteProps> = ({ path }) => {
  return (
    <>
      <PrivateRoute path={`${path}`} component={LobbyRootPage} />
      <PrivateRoute path={`${path}/create-room`} component={CreateRoom} />
    </>
  );
};

export default LobbyRoutes;

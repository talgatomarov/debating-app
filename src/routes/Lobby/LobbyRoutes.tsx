import React from "react";
import { RouteProps } from "react-router-dom";
import LobbyRootPage from "./LobbyRootPage";
import PrivateRoute from "components/PrivateRoute";
import CreateRoom from "./CreateRoom";
import { WaitingRoomPage } from "./Room";

const LobbyRoutes: React.FC<RouteProps> = ({ path }) => {
  return (
    <>
      <PrivateRoute exact path={`${path}`} component={LobbyRootPage} />
      <PrivateRoute exact path={`${path}/create-room`} component={CreateRoom} />
      <PrivateRoute
        exact
        path={`${path}/:roomId/waiting-room`}
        component={WaitingRoomPage}
      />
      <PrivateRoute exact path={`${path}/:roomId/room`} />
    </>
  );
};

export default LobbyRoutes;

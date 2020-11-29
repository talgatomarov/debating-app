import React from "react";
import { RouteProps } from "react-router-dom";
import LobbyRootPage from "./LobbyRootPage";
import PrivateRoute from "components/PrivateRoute";
import CreateRoom from "./CreateRoom";
import { WaitingRoomPage, PreparationRoomPage, RoundRoomPage } from "./Room";

const LobbyRoutes: React.FC<RouteProps> = ({ path }) => {
  return (
    <>
      <PrivateRoute exact path={`${path}`} component={LobbyRootPage} />
      <PrivateRoute exact path={`${path}/create-room`} component={CreateRoom} />
      <PrivateRoute
        exact
        path={`${path}/:roomId/prep/:position`}
        component={PreparationRoomPage}
      />
      <PrivateRoute
        exact
        path={`${path}/:roomId/waiting-room`}
        component={WaitingRoomPage}
      />
      <PrivateRoute
        exact
        path={`${path}/:roomId/round-room`}
        component={RoundRoomPage}
      />
    </>
  );
};

export default LobbyRoutes;

import React from "react";
import { RouteProps } from "react-router-dom";
import LobbyRootPage from "./LobbyRootPage";
import PrivateRoute from "components/PrivateRoute";
import CreateRoom from "./CreateRoom";
import RoomPage from "./Room/Room";
import PreparationRoomPage from "./Room/PreparationRoom";

const LobbyRoutes: React.FC<RouteProps> = ({ path }) => {
  return (
    <>
      <PrivateRoute exact path={`${path}`} component={LobbyRootPage} />
      <PrivateRoute exact path={`${path}/create-room`} component={CreateRoom} />
      <PrivateRoute exact path={`${path}/room/:roomId`} component={RoomPage} />
      <PrivateRoute
        exact
        path={`${path}/:roomId/prep/:teamId`}
        component={PreparationRoomPage}
      />
    </>
  );
};

export default LobbyRoutes;

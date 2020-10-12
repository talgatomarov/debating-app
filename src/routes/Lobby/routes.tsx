import React from "react";
import { Route, RouteComponentProps } from "react-router-dom";
import LobbyRootPage from "routes/Lobby/RootPage";
import RoomPage from "./Room/Room";

const LobbyRoutes: React.FC<RouteComponentProps> = ({ match }) => {
  return (
    <>
      <Route exact path={`${match.url}`} component={LobbyRootPage} />
      <Route path={`${match.url}/room`} component={RoomPage} />
    </>
  );
};

export default LobbyRoutes;

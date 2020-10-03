import React from "react";
import { Route, RouteComponentProps } from "react-router-dom";
import LobbyRootPage from "routes/Lobby/RootPage";

const LobbyRoutes: React.FC<RouteComponentProps> = ({ match }) => {
  return (
    <>
      <Route exact path={`${match.url}`} component={LobbyRootPage} />
    </>
  );
};

export default LobbyRoutes;

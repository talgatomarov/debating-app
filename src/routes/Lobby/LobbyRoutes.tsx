import React from "react";
import { RouteProps } from "react-router-dom";
import LobbyRootPage from "./LobbyRootPage";
import PrivateRoute from "components/PrivateRoute";

const LobbyRoutes: React.FC<RouteProps> = ({ path }) => {
  return (
    <>
      <PrivateRoute exact path={`${path}`} component={LobbyRootPage} />
    </>
  );
};

export default LobbyRoutes;

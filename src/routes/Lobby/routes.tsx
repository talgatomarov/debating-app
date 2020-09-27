import React from "react";
import { Route } from "react-router-dom";
import LobbyRootPage from "routes/Lobby/RootPage";

const LobbyRoutes = (props: any) => {
  const { match } = props;

  return (
    <>
      <Route exact path={`${match.url}`} component={LobbyRootPage} />
    </>
  );
};

export default LobbyRoutes;

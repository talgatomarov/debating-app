import React from "react";
import LobbyLayout from "containers/layout/LobbyLayout";
import LobbyRoutes from "./routes";
import { RouteComponentProps } from "react-router-dom";

const LobbyPage: React.FC<RouteComponentProps> = (props) => {
  return (
    <LobbyLayout>
      <div>
        <LobbyRoutes {...props} />
      </div>
    </LobbyLayout>
  );
};

export default LobbyPage;

import React from "react";
// import CreateRoom from "routes/Room/CreateRoom";
import { RouteComponentProps } from "react-router-dom";
import CreateRoom from "./Room/CreateRoom";

const LobbyRootPage: React.FC<RouteComponentProps> = (props) => {
  return (
    <div>
      <CreateRoom {...props} />
    </div>
  );
};

export default LobbyRootPage;

import React from "react";
import LobbyLayout from "containers/layout/LobbyLayout";
import LobbyRoutes from "./routes";

const LobbyPage = (props: any) => {
  return (
    <LobbyLayout>
      <div>
        <LobbyRoutes {...props} />
      </div>
    </LobbyLayout>
  );
};

export default LobbyPage;

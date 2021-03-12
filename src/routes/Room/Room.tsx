import { LobbyLayout } from "containers/layout";
import React from "react";
import { Stage } from "interfaces/Room";
import { Alert } from "@material-ui/lab";
import Formation from "./Formation";
import Preparation from "./Preparation";
import Ongoing from "./Ongoing";
import Deliberation from "./Deliberation";
import Adjudication from "./Adjudication";
import { useStores } from "hooks";
import { observer } from "mobx-react";
import { Box, CircularProgress } from "@material-ui/core";

const Room: React.FC = observer(() => {
  const { roomStore, userStore } = useStores();

  const selectStage = (stage: string | undefined) => {
    switch (stage) {
      case Stage.formation:
        return <Formation />;
      case Stage.preparation:
        return <Preparation />;
      case Stage.ongoing:
        return <Ongoing />;
      case Stage.deliberation:
        return <Deliberation />;
      case Stage.adjudication:
        return <Adjudication />;
      default:
        return (
          <Alert severity="error" data-testid="error">
            Unknown room stage
          </Alert>
        );
    }
  };

  console.log(roomStore.error);

  return (
    <LobbyLayout>
      {!roomStore.loading && roomStore.error && (
        <Alert severity="error" data-testid="error">
          {roomStore.error.message}
        </Alert>
      )}
      {roomStore.loading && (
        <Box display="flex" justifyContent="center" data-testid="loading">
          <CircularProgress />
        </Box>
      )}
      {!roomStore.loading && userStore.roomId && selectStage(roomStore.stage)}
    </LobbyLayout>
  );
});

export default Room;

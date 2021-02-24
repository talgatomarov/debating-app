import { LobbyLayout } from "containers/layout";
import React from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { useParams } from "react-router-dom";
import app from "app";
import { Room as IRoom, Stage } from "interfaces/Room";
import { Box, CircularProgress } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import Formation from "./Formation";
import Preparation from "./Preparation";
import Ongoing from "./Ongoing";
import Deliberation from "./Deliberation";
import Adjudication from "./Adjudication";

export interface RouteParams {
  roomId: string;
}

const Room: React.FC = () => {
  const { roomId } = useParams<RouteParams>();

  const [room, loading, error] = useDocumentData<IRoom>(
    app.firestore().collection("rooms").doc(roomId)
  );

  const selectStage = (stage: string) => {
    switch (stage) {
      case Stage.formation:
        return <Formation room={room!} />;
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

  return (
    <LobbyLayout>
      {error && (
        <Alert severity="error" data-testid="error">
          Room does not exists or could not fetch the data
        </Alert>
      )}
      {loading && (
        <Box display="flex" justifyContent="center" data-testid="loading">
          <CircularProgress />
        </Box>
      )}
      {room && selectStage(room.stage)}
    </LobbyLayout>
  );
};

export default Room;

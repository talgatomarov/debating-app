import React from "react";
import { LobbyLayout } from "containers/layout";
import { Typography, Button } from "@material-ui/core";
import JitsiMeet from "components/JitsiMeet";
import app from "app";
import { useParams, Link as RouterLink } from "react-router-dom";
import Loader from "components/Loader";

interface RouteParams {
  roomId: string;
  position: string;
}

const PreparationRoom: React.FC = () => {
  const { roomId, position } = useParams<RouteParams>();

  const linkToRoom = `/lobby/${roomId}/round-room`;

  const displayName = app.auth().currentUser!.displayName!;
  const roomName = roomId + "-" + position;

  return (
    <LobbyLayout>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
        }}
      >
        <Typography variant="h5" color="primary" align="center">
          Preparation Room
        </Typography>
        <br />
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignSelf: "center",
            alignContent: "center",
          }}
        >
          <JitsiMeet
            loadingComponent={Loader}
            displayName={displayName}
            roomName={roomName}
          />
          <br />
          <div
            style={{
              maxWidth: "3rem !important",
              alignSelf: "center",
            }}
          >
            <Button
              color="primary"
              size="medium"
              variant="contained"
              component={RouterLink}
              to={linkToRoom}
            >
              Link to the room
            </Button>
          </div>
        </div>
      </div>
    </LobbyLayout>
  );
};

export default PreparationRoom;

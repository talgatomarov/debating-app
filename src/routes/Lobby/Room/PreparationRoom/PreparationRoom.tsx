import React from "react";
import { LobbyLayout } from "containers/layout";
import { makeStyles, createStyles, Typography } from "@material-ui/core";
import JitsiMeet from "components/JitsiMeet";
import app from "app";
import { useParams } from "react-router-dom";

interface RouteParams {
  roomId: string;
  position: string;
}

const useStyles = makeStyles(() =>
  createStyles({
    layout: {
      maxWidth: "600px",
      padding: "0 1rem",
    },
    title: {
      paddingBottom: "2rem",
    },
  })
);

const PreparationRoom: React.FC = () => {
  const classes = useStyles();
  const { roomId, position } = useParams<RouteParams>();

  const displayName = app.auth().currentUser!.displayName!;
  const roomName = roomId + "-" + position;

  return (
    <LobbyLayout>
      <div className={classes.layout}>
        <Typography variant="h5" className={classes.title}>
          Preparation Room
        </Typography>
        <JitsiMeet displayName={displayName} roomName={roomName} />
      </div>
    </LobbyLayout>
  );
};

export default PreparationRoom;

import { LobbyLayout } from "containers/layout";
import React from "react";

import { makeStyles, createStyles, Theme, Typography } from "@material-ui/core";
import JitsiMeet from "components/JitsiMeet";
import app from "app";

interface PreparationRoomProps {
  roomId: string;
  position: string;
}

const useStyles = makeStyles((theme: Theme) =>
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

const PreparationRoom: React.FC<PreparationRoomProps> = ({
  roomId,
  position,
}) => {
  const classes = useStyles();
  const displayName = app.auth().currentUser!.displayName!;
  const roomName = roomId + "-" + position;

  return (
    <LobbyLayout>
      <div className={classes.layout}>
        <Typography variant="h5" className={classes.title}>
          Create Room
        </Typography>
        <JitsiMeet displayName={displayName} roomName={roomName} />
      </div>
    </LobbyLayout>
  );
};

export default PreparationRoom;

import { LobbyLayout } from "containers/layout";
import React from "react";

import { makeStyles, createStyles, Theme, Typography } from "@material-ui/core";
import JitsiMeet from "components/JitsiMeet";
import app from "app";
import { RouteComponentProps } from "react-router-dom";

interface RouteParams {
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

const PreparationRoom: React.FC<RouteComponentProps<RouteParams>> = (props) => {
  const classes = useStyles();
  console.log(props);
  const roomId = props.match.params.roomId;
  const position = props.match.params.position;

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

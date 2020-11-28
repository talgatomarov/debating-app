import React, { useEffect, useState } from "react";
import { LobbyLayout } from "containers/layout";
import { makeStyles, createStyles, Typography } from "@material-ui/core";
import JitsiMeet from "components/JitsiMeet";
import app from "app";
import { useParams } from "react-router-dom";
import RoomLink from "components/RoundRoom/RoomLink";
import Timer from "components/RoundRoom/Timer";

interface RouteParams {
  roomId: string;
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

const RoundRoom: React.FC = () => {
  const classes = useStyles();
  const { roomId } = useParams<RouteParams>();
  const [motion, setMotion] = useState();
  const [owner, setOwner] = useState();

  useEffect(() => {
    if (roomId) {
      app
        .firestore()
        .collection("rooms")
        .doc(roomId)
        .get()
        .then((room) => {
          if (room.exists) {
            setMotion(room.get("motion"));
            setOwner(room.get("owner"));
          } else {
            console.log("cannot retrieve room info");
          }
        })
        .catch(() => console.log("cannot retrieve room info"));
    }
  });

  const currentUser = app.auth().currentUser!;

  return (
    <LobbyLayout>
      <div className={classes.layout}>
        <Typography variant="h5" className={classes.title}>
          {motion}
        </Typography>
        <RoomLink linkToCopy={roomId} />
        <Timer roomId={roomId} isOwner={owner === currentUser.uid} />
        <JitsiMeet displayName={currentUser.displayName!} roomName={roomId} />
      </div>
    </LobbyLayout>
  );
};

export default RoundRoom;

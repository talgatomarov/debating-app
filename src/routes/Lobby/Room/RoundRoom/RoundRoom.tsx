import React, { useCallback, useMemo } from "react";
import { LobbyLayout } from "containers/layout";
import { makeStyles, createStyles, Typography, Link } from "@material-ui/core";
import JitsiMeet from "components/JitsiMeet";
import app from "app";
import { useParams, Link as RouterLink } from "react-router-dom";
import RoomLink from "components/RoundRoom/RoomLink";
import Timer from "components/RoundRoom/Timer";
import Loader from "components/Loader";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { Room } from "interfaces/Room";

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

// TODO: Refactor to a separate interface?
const teamMap = new Map([
  [0, "og"],
  [1, "og"],
  [2, "oo"],
  [3, "oo"],
  [4, "cg"],
  [5, "cg"],
  [6, "co"],
  [7, "co"],
]);

const RoundRoom: React.FC = () => {
  const currentUser = app.auth().currentUser!;
  const classes = useStyles();
  const { roomId } = useParams<RouteParams>();
  const [room, loading, error] = useDocumentData<Room>(
    app.firestore().doc(`rooms/${roomId}`)
  );

  const playerTeam = useMemo(() => {
    const index =
      (room?.players &&
        room?.players.findIndex((n) => n === currentUser.uid)) ||
      -1;
    return teamMap.get(index);
  }, [room, currentUser]);

  const handleAPI = useCallback((JitsiMeetAPI) => {
    JitsiMeetAPI.executeCommand("participantLeft");
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <p>Could not load the room data. {error.message}</p>;
  }

  return (
    <LobbyLayout>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignContent: "center",
        }}
      >
        <Typography variant="h6" color="textPrimary" align="center">
          {room?.name}
        </Typography>
        {room?.players.length === 9 && (
          <>
            <Typography
              variant="h4"
              color="primary"
              align="center"
              className={classes.title}
            >
              {room?.motion}
            </Typography>
            {playerTeam && (
              <Link
                component={RouterLink}
                variant="body2"
                to={`/lobby/${roomId}/prep/${playerTeam}`}
              >
                Link to your Preparation Room
              </Link>
            )}
          </>
        )}
        <Timer roomId={roomId} isOwner={room?.owner === currentUser.uid} />
        <br />
        <div
          style={{
            display: "flex",
            alignSelf: "center",
            alignContent: "center",
          }}
        >
          <JitsiMeet
            onAPILoad={handleAPI}
            loadingComponent={Loader}
            displayName={currentUser.displayName!}
            roomName={roomId}
          />
        </div>
        <RoomLink linkToCopy={roomId} />
      </div>
    </LobbyLayout>
  );
};

export default RoundRoom;

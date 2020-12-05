import React, { useEffect, useState, useCallback, useMemo } from "react";
import { LobbyLayout } from "containers/layout";
import { makeStyles, createStyles, Typography, Link } from "@material-ui/core";
import JitsiMeet from "components/JitsiMeet";
import app from "app";
import { useParams, useHistory } from "react-router-dom";
import RoomLink from "components/RoundRoom/RoomLink";
import Timer from "components/RoundRoom/Timer";
import { Player } from "interfaces/Player";
import Loader from "components/Loader";

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
  const history = useHistory();
  const currentUser = app.auth().currentUser!;
  const database = app.firestore();
  const classes = useStyles();
  const { roomId } = useParams<RouteParams>();
  const [motion, setMotion] = useState<string>();
  const [owner, setOwner] = useState<string>();
  const [title, setTitle] = useState<string>();
  const [enteredPlayersCount, setEnteredPlayersCount] = useState<number>();
  const [showMotion, setShowMotion] = useState<boolean>(false);
  const [players, setPlayers] = useState<Player[]>();

  const playerTeam = useMemo(() => {
    const index =
      (players && players.findIndex((n) => n.id === currentUser.uid)) || -1;
    return teamMap.get(index);
  }, [players, currentUser]);
  const onLinkToPrepRoomClick = useCallback(
    () => history.push(`/lobby/${roomId}/prep/${playerTeam}`),
    [history, playerTeam, roomId]
  );

  const handleAPI = useCallback((JitsiMeetAPI) => {
    JitsiMeetAPI.executeCommand("participantLeft");
  }, []);
  useEffect(() => {
    if (enteredPlayersCount === 9) {
      setShowMotion(true);
    }
  }, [enteredPlayersCount]);
  useEffect(() => {
    if (roomId) {
      database
        .collection("rooms")
        .doc(roomId)
        .get()
        .then((room) => {
          if (room.exists) {
            setMotion(room.get("motion"));
            setOwner(room.get("owner"));
            setTitle(room.get("roomName"));
          } else {
            console.log("cannot retrieve room info");
          }
        })
        .catch(() => console.log("cannot retrieve room info"));
    }
  });
  useEffect(
    () =>
      database
        .collection("rooms")
        .doc(roomId)
        .onSnapshot((doc) => {
          const data = doc.data();
          setEnteredPlayersCount(data!.enteredPlayersCount);
          setPlayers(data!.players);
        }),
    [database, roomId]
  );

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
          {title}
        </Typography>
        {showMotion && (
          <>
            <Typography
              variant="h4"
              color="primary"
              align="center"
              className={classes.title}
            >
              {motion}
            </Typography>
            {playerTeam && (
              <Link
                component="button"
                variant="body2"
                onClick={onLinkToPrepRoomClick}
              >
                Link to your Preparation Room
              </Link>
            )}
          </>
        )}
        <Timer roomId={roomId} isOwner={owner === currentUser.uid} />
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

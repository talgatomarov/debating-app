import React, { useEffect } from "react";
import { LobbyLayout } from "containers/layout";
import { Typography, Button } from "@material-ui/core";
import app from "app";
import firebase from "firebase";
import { useParams, Link as RouterLink } from "react-router-dom";

interface RouteParams {
  roomId: string;
  position: string;
}

const PreparationRoom: React.FC = () => {
  const { roomId } = useParams<RouteParams>();

  const linkToRoom = `/lobby/${roomId}/round-room`;

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
              onClick={() => {
                const fn = firebase.functions().httpsCallable("getRooms");

                fn({})
                  .then((res) => console.log(res.data))
                  .catch((err) => console.log(err));
              }}
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

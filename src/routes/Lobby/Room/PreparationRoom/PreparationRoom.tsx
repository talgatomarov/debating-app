import React from "react";
import { LobbyLayout } from "containers/layout";
import {
  makeStyles,
  createStyles,
  Typography,
  Button,
  Grid,
} from "@material-ui/core";
import JitsiMeet from "components/JitsiMeet";
import app from "app";
import { useParams, Link as RouterLink } from "react-router-dom";

interface RouteParams {
  roomId: string;
  position: string;
}

const useStyles = makeStyles(() =>
  createStyles({
    layout: {
      maxWidth: "100%",
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

  const linkToRoom = `/lobby/${roomId}/round-room`;

  const displayName = app.auth().currentUser!.displayName!;
  const roomName = roomId + "-" + position;

  return (
    <LobbyLayout>
      <div className={classes.layout}>
        <Typography variant="h5" className={classes.title}>
          Preparation Room
        </Typography>
        <Grid container justify="center" alignItems="center" spacing={4}>
          <Grid item xs={12}>
            <JitsiMeet displayName={displayName} roomName={roomName} />
          </Grid>
          <Grid item xs={12}>
            <Button
              color="primary"
              variant="contained"
              component={RouterLink}
              to={linkToRoom}
            >
              Link to the room
            </Button>
          </Grid>
        </Grid>
      </div>
    </LobbyLayout>
  );
};

export default PreparationRoom;

import React from "react";
import { LobbyLayout } from "containers/layout";
import CreateRoomForm from "./components/CreateRoomForm";
import { makeStyles, createStyles, Theme, Typography } from "@material-ui/core";

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

const CreateRoom: React.FC = () => {
  const classes = useStyles();
  return (
    <LobbyLayout>
      <div className={classes.layout}>
        <Typography variant="h4" className={classes.title}>
          Create Room
        </Typography>
        <CreateRoomForm />
      </div>
    </LobbyLayout>
  );
};

export default CreateRoom;

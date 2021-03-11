import { Box, CircularProgress, Typography } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import app from "app";
import { LobbyLayout } from "containers/layout";
import { useStores } from "hooks";
import { Room } from "interfaces/Room";
import { observer } from "mobx-react";
import React from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import { Redirect } from "react-router-dom";
import RoomTable from "./components/RoomTable";

const LobbyRootPage: React.FC = observer(() => {
  const { userStore } = useStores();
  const [rooms, loading, error] = useCollectionData<Room>(
    app
      .firestore()
      .collection("rooms")
      .where("privacy", "==", "public")
      .where("stage", "==", "formation"),
    { idField: "id" }
  );

  if (userStore.loading) {
    return (
      <Box display="flex" justifyContent="center" data-testid="loading">
        <CircularProgress />
      </Box>
    );
  }
  if (userStore.roomId) {
    return <Redirect to="/room" />;
  }

  return (
    <LobbyLayout>
      <Typography variant="h5">Public Rooms</Typography>
      {loading && (
        <Box display="flex" justifyContent="center" data-testid="loading">
          <CircularProgress />
        </Box>
      )}
      {error && (
        <Alert severity="error" data-testid="error">
          {error.message}
        </Alert>
      )}
      {!error && !loading && <RoomTable rooms={rooms} />}
    </LobbyLayout>
  );
});

export default LobbyRootPage;

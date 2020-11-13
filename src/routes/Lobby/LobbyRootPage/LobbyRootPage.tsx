import { Box, CircularProgress, Typography } from "@material-ui/core";
import { Alert } from "@material-ui/lab";
import app from "app";
import { LobbyLayout } from "containers/layout";
import { Room } from "interfaces/Room";
import React from "react";
import { useCollectionData } from "react-firebase-hooks/firestore";
import RoomTable from "./components/RoomTable";
import { RouteComponentProps } from "react-router-dom";

const LobbyRootPage: React.FC<RouteComponentProps> = (props) => {
  const [rooms, loading, error] = useCollectionData<Room>(
    app.firestore().collection("rooms").where("publicRoom", "==", true),
    { idField: "id" }
  );
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
      {!error && !loading && <RoomTable rooms={rooms} props={props} />}
    </LobbyLayout>
  );
};

export default LobbyRootPage;

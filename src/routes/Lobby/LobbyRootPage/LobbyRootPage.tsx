import React from "react";
import { useCollection } from "react-firebase-hooks/firestore";
import { firestore } from "app";
import { LobbyLayout } from "containers/layout";
import RoomTable from "./components/RoomTable";
import { Typography, Box, CircularProgress } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

const LobbyRootPage: React.FC = () => {
  const [rooms, loading, error] = useCollection(
    firestore.collection("rooms").where("publicRoom", "==", true)
  );
  return (
    <LobbyLayout>
      <Typography variant="h5">Public Rooms</Typography>
      {loading && (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      )}
      {error && <Alert severity="error">{error.message}</Alert>}
      {!error && !loading && <RoomTable rooms={rooms} />}
    </LobbyLayout>
  );
};

export default LobbyRootPage;

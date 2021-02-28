import React from "react";
import axios from "axios";
import DailyFrame from "components/DailyFrame";
import app from "app";
import { UserData } from "interfaces/UserData";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { Alert } from "@material-ui/lab";
import { Box, Button, CircularProgress } from "@material-ui/core";
import { Room } from "interfaces/Room";
import { RouteParams } from "../Room";
import { useParams } from "react-router-dom";

interface PreparationProps {
  room: Room;
}

const Preparation: React.FC<PreparationProps> = ({ room }) => {
  const currentUser = app.auth().currentUser!;
  const { roomId } = useParams<RouteParams>();
  const [userData, loading, error] = useDocumentData<UserData>(
    app.firestore().collection("users").doc(app.auth().currentUser!.uid)
  );

  const handleStartRound = async () => {
    const authToken = await currentUser.getIdToken(true);

    // TODO: handle error
    await axios.post(`/api/rooms/${roomId}/startRound`, null, {
      headers: {
        authorization: `Bearer ${authToken}`,
      },
    });
  };

  return (
    <>
      {error && (
        <Alert severity="error" data-testid="error">
          Room does not exists or could not fetch the data
        </Alert>
      )}
      {loading && (
        <Box display="flex" justifyContent="center" data-testid="loading">
          <CircularProgress />
        </Box>
      )}
      <div>Preparation</div>
      {/* TODO: Integrate preparation timer here */}
      {room.judges.some((judge) => judge.uid === currentUser.uid) && (
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => handleStartRound()}
        >
          Start round
        </Button>
      )}
      {userData?.meetingName && (
        <DailyFrame
          meetingName={userData.meetingName}
          meetingToken={userData.meetingToken}
        />
      )}
    </>
  );
};

export default Preparation;

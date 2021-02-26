import React from "react";
import DailyFrame from "components/DailyFrame";
import app from "app";
import { UserData } from "interfaces/UserData";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { Alert } from "@material-ui/lab";
import { Box, Button, CircularProgress } from "@material-ui/core";
import { Room } from "interfaces/Room";

interface PreparationProps {
  room: Room;
}

const Preparation: React.FC<PreparationProps> = ({ room }) => {
  const currentUser = app.auth().currentUser!;
  const [userData, loading, error] = useDocumentData<UserData>(
    app.firestore().collection("users").doc(app.auth().currentUser!.uid)
  );

  const handleStartRound = async () => {
    // TODO: Implement "start round" logic
    console.log("Start round");
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
      {userData?.meetingName && (
        <DailyFrame
          meetingName={userData.meetingName}
          meetingToken={userData.meetingToken}
        />
      )}

      {/* TODO: Integrate preparation timer here */}

      {room.judges.some((judge) => judge.uid === currentUser.uid) && (
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => handleStartRound()}
        >
          Start preparation
        </Button>
      )}
    </>
  );
};

export default Preparation;

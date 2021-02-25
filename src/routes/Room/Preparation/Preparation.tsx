import React from "react";
import DailyFrame from "components/DailyFrame";
import app from "app";
import { UserData } from "interfaces/UserData";
import { useDocumentData } from "react-firebase-hooks/firestore";
import { Alert } from "@material-ui/lab";
import { Box, CircularProgress } from "@material-ui/core";

const Preparation: React.FC = () => {
  const [userData, loading, error] = useDocumentData<UserData>(
    app.firestore().collection("users").doc(app.auth().currentUser!.uid)
  );

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
    </>
  );
};

export default Preparation;

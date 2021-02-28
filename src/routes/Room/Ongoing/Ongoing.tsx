import { UserData } from "interfaces/UserData";
import React from "react";
import { useDocumentData } from "react-firebase-hooks/firestore";
import app from "app";
import { Alert } from "@material-ui/lab";
import { Box, CircularProgress } from "@material-ui/core";
import DailyFrame from "components/DailyFrame";

const Ongoing: React.FC = () => {
  const [userData, loading, error] = useDocumentData<UserData>(
    app.firestore().collection("users").doc(app.auth().currentUser!.uid)
  );

  return (
    <>
      <div>Ongoing</div>
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
      {userData?.meetingName && (
        <DailyFrame
          meetingName={userData.meetingName}
          meetingToken={userData.meetingToken}
        />
      )}
    </>
  );
};

export default Ongoing;

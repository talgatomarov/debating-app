import React from "react";
import DailyFrame from "components/DailyFrame";
import app from "app";
import { Alert } from "@material-ui/lab";
import { Button } from "@material-ui/core";
import { useStores } from "hooks";

const Preparation: React.FC = () => {
  const currentUser = app.auth().currentUser!;
  const { roomStore, userStore } = useStores();

  return (
    <>
      {!userStore.meetingName && (
        <Alert severity="error" data-testid="error">
          Room does not exists or could not fetch the data
        </Alert>
      )}
      <div>Preparation</div>
      {/* TODO: Integrate preparation timer here */}
      {roomStore.judges?.some((judge) => judge.uid === currentUser.uid) && (
        <Button
          variant="contained"
          color="primary"
          size="small"
          onClick={() => roomStore.startRound()}
        >
          Start round
        </Button>
      )}
      {userStore.meetingName && (
        <DailyFrame
          meetingName={userStore.meetingName}
          meetingToken={userStore.meetingToken}
        />
      )}
    </>
  );
};

export default Preparation;

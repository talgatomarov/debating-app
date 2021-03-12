import React from "react";
import DailyFrame from "components/DailyFrame";
import app from "app";
import { Alert } from "@material-ui/lab";
import { Button } from "@material-ui/core";
import { useStores } from "hooks";
import { observer } from "mobx-react";

const Preparation: React.FC = observer(() => {
  const currentUser = app.auth().currentUser!;
  const { roomStore, userStore } = useStores();

  return (
    <>
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
});

export default Preparation;

import { Button } from "@material-ui/core";
import app from "app";
import DailyFrame from "components/DailyFrame";
import { useStores } from "hooks";
import { Judge } from "interfaces/Judge";
import React from "react";

const Adjudication: React.FC = () => {
  const currentUser = app.auth().currentUser!;
  const { userStore, roomStore } = useStores();

  return (
    <>
      <div>Adjudication</div>
      {roomStore.judges?.some(
        (judge: Judge) => judge.uid === currentUser.uid
      ) && (
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => roomStore.startAdjudication()}
          style={{ margin: "1rem 0 1rem 0" }}
        >
          End round
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

export default Adjudication;

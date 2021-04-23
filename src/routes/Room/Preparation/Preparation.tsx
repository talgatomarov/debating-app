import React from "react";
import DailyFrame from "components/DailyFrame";
import app from "app";
import { Button, Typography } from "@material-ui/core";
import { useStores } from "hooks";
import { observer } from "mobx-react";
import { Judge } from "interfaces/Judge";

const Preparation: React.FC = observer(() => {
  const { roomStore, userStore } = useStores();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        margin: "auto",
        alignItems: "center",
      }}
    >
      <Typography variant="h4">Preparation</Typography>
      <Typography variant="h6">Motion: {roomStore.motion}</Typography>
      <Typography variant="h6">Infoslide: {roomStore.infoslide}</Typography>
      {/* TODO: Integrate preparation timer here */}
      {roomStore.judges?.some(
        (judge: Judge) => judge.uid === userStore.currentUser?.uid
      ) && (
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => roomStore.startRound()}
          style={{ margin: "1rem 0 1rem 0" }}
        >
          Start round
        </Button>
      )}
      {userStore.meetingName && (
        <div style={{ width: "75%" }}>
          <DailyFrame
            meetingName={userStore.meetingName}
            meetingToken={userStore.meetingToken}
          />
        </div>
      )}
    </div>
  );
});

export default Preparation;

import { Button, Typography } from "@material-ui/core";
import DailyFrame from "components/DailyFrame";
import { useStores } from "hooks";
import { Judge } from "interfaces/Judge";
import React from "react";

const Adjudication: React.FC = () => {
  const { userStore, roomStore } = useStores();

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        margin: "auto",
        alignItems: "center",
      }}
    >
      <Typography variant="h4">Adjudication</Typography>
      {roomStore.judges?.some(
        (judge: Judge) => judge.uid === userStore.currentUser?.uid
      ) && (
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => roomStore.endRound()}
          style={{ margin: "1rem 0 1rem 0" }}
        >
          End round
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
};

export default Adjudication;

import React from "react";
import DailyFrame from "components/DailyFrame";
import { useStores } from "hooks";
import { observer } from "mobx-react";
import { Judge } from "interfaces/Judge";
import { Button, Typography } from "@material-ui/core";

const Ongoing: React.FC = observer(() => {
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
      <Typography variant="h4">Ongoing</Typography>
      {/* TODO: Integrate preparation timer here */}
      {roomStore.judges?.some(
        (judge: Judge) => judge.uid === userStore.currentUser?.uid
      ) && (
        <Button
          variant="contained"
          color="primary"
          size="large"
          onClick={() => roomStore.startDeliberation()}
          style={{ margin: "1rem 0 1rem 0" }}
        >
          Start judging
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

export default Ongoing;

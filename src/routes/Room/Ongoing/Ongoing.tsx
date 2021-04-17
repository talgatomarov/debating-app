import React from "react";
import DailyFrame from "components/DailyFrame";
import { useStores } from "hooks";
import { observer } from "mobx-react";
import { roomStore } from "stores";
import { Judge } from "interfaces/Judge";
import { Button } from "@material-ui/core";
import app from "app";

const Ongoing: React.FC = observer(() => {
  const currentUser = app.auth().currentUser!;
  const { userStore } = useStores();

  return (
    <>
      <div>Ongoing</div>
      {/* TODO: Integrate preparation timer here */}
      {roomStore.judges?.some(
        (judge: Judge) => judge.uid === currentUser.uid
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
        <DailyFrame
          meetingName={userStore.meetingName}
          meetingToken={userStore.meetingToken}
        />
      )}
    </>
  );
});

export default Ongoing;

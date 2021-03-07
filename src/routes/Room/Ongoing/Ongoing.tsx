import React from "react";
import { Alert } from "@material-ui/lab";
import DailyFrame from "components/DailyFrame";
import { useStores } from "hooks";
import { observer } from "mobx-react";

const Ongoing: React.FC = observer(() => {
  const { userStore } = useStores();

  return (
    <>
      <div>Ongoing</div>
      {!userStore.meetingName && (
        <Alert severity="error" data-testid="error">
          Room does not exists or could not fetch the data
        </Alert>
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

import DailyFrame from "components/DailyFrame";
import { useStores } from "hooks";
import React from "react";

const Adjudication: React.FC = () => {
  const { userStore } = useStores();

  return (
    <>
      <div>Adjudication</div>
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

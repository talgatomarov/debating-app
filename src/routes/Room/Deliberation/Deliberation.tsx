import DailyFrame from "components/DailyFrame";
import { useStores } from "hooks";
import React from "react";

const Deliberation: React.FC = () => {
  const { userStore } = useStores();

  return (
    <>
      <div>Deliberation</div>
      {userStore.meetingName && (
        <DailyFrame
          meetingName={userStore.meetingName}
          meetingToken={userStore.meetingToken}
        />
      )}
    </>
  );
};

export default Deliberation;

import React, { useEffect, useState } from "react";
import app from "app";
import DailyFrame from "components/DailyFrame";

const Preparation: React.FC = () => {
  const [meetingName, setMeetingName] = useState<string | null>(null);
  const [meetingToken, setMeetingToken] = useState<string>();

  useEffect(() => {
    app
      .auth()
      .currentUser!.getIdTokenResult()
      .then((idTokenResult) => {
        const { meetingToken, meetingName } = idTokenResult.claims;
        setMeetingToken(meetingToken);
        setMeetingName(meetingName);
        console.log(meetingName);
        console.log(meetingToken);
      });
  }, []);

  return (
    <>
      <div>Preparation</div>
      {meetingName && (
        <DailyFrame meetingName={meetingName} meetingToken={meetingToken} />
      )}
    </>
  );
};

export default Preparation;

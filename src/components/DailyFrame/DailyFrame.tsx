import React, { useRef, useEffect } from "react";
import DailyIframe from "@daily-co/daily-js";
import { makeStyles } from "@material-ui/core";

interface DailyFrameProps {
  meetingName: string;
  meetingToken?: string;
}

const dailyUrl = "https://debating-app.daily.co";

const useStyles = makeStyles(() => ({
  dailyiframe: {
    width: "100%",
    height: "90vh",
    border: "0",
  },
}));

const DailyFrame: React.FC<DailyFrameProps> = ({
  meetingName,
  meetingToken,
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const classes = useStyles();

  useEffect(() => {
    const daily = DailyIframe.wrap(iframeRef.current!, {
      showFullscreenButton: true,
    });
    daily.join({ url: `${dailyUrl}/${meetingName}?t=${meetingToken}` });
  }, [meetingName, meetingToken]);

  return (
    <div data-testid="daily-frame">
      <iframe
        title="test"
        className={classes.dailyiframe}
        ref={iframeRef}
        allow="camera; microphone; fullscreen"
      ></iframe>
    </div>
  );
};

export default DailyFrame;

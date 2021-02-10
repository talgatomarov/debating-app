import React, { useRef, useEffect } from "react";
import DailyIframe from "@daily-co/daily-js";
import { makeStyles } from "@material-ui/core";

interface DailyFrameProps {
  url: string;
}

const useStyles = makeStyles(() => ({
  dailyiframe: {
    width: "100%",
    height: "100%",
    border: "0",
  },
}));

const DailyFrame: React.FC<DailyFrameProps> = ({ url }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const classes = useStyles();

  useEffect(() => {
    const daily = DailyIframe.wrap(iframeRef.current!);
    daily.join({ url });
  }, [url]);

  return (
    <iframe
      title="test"
      className={classes.dailyiframe}
      ref={iframeRef}
      allow="camera; microphone; fullscreen"
    ></iframe>
  );
};

export default DailyFrame;

import React, { useRef, useEffect } from "react";
import DailyIframe from "@daily-co/daily-js";

interface DailyFrameProps {
  url: string;
}

const DailyFrame: React.FC<DailyFrameProps> = ({ url }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const daily = DailyIframe.wrap(iframeRef.current!);
    daily.join({ url });
  }, [url]);

  return (
    <iframe
      title="test"
      ref={iframeRef}
      allow="camera; microphone; fullscreen"
    ></iframe>
  );
};

export default DailyFrame;

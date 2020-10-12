import React, { useState } from "react";
import { CardMedia } from "@material-ui/core";

interface VideoChatProps {
  localVideoRef: any;
  remoteVideoRef: any;
}

const VideoChat: React.FC<VideoChatProps> = ({
  localVideoRef,
  remoteVideoRef,
}) => {
  console.log("in video chat component");
  return (
    <div>
      <div>
        <video ref={localVideoRef} muted autoPlay playsInline></video>
      </div>
      <div>
        <video ref={remoteVideoRef} autoPlay playsInline></video>
      </div>
    </div>
  );
};

export default VideoChat;

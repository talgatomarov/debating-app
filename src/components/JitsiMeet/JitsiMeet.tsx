import React from "react";
import Jitsi from "react-jitsi";
import { Props as JitsiProps } from "react-jitsi/dist/types";
import interfaceConfig from "./interfaceConfig";

const JitsiMeet: React.FC<JitsiProps> = (props) => {
  return (
    <Jitsi
      {...props}
      domain="debatingapp-jitsi.ml"
      interfaceConfig={interfaceConfig}
    />
  );
};

export default JitsiMeet;

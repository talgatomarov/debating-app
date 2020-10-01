import * as React from "react";
import { faFacebook } from "@fortawesome/free-brands-svg-icons";
import firebase from "firebase";
import OAuthButton from "./OAuthButton";

const FacebookAuthButton: React.FC = () => {
  return (
    <OAuthButton
      provider={new firebase.auth.FacebookAuthProvider()}
      icon={faFacebook}
      backgroundColor="#3B5998"
    >
      Sign in with Facebook
    </OAuthButton>
  );
};

export default FacebookAuthButton;

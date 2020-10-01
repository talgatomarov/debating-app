import * as React from "react";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import firebase from "firebase";
import OAuthButton from "./OAuthButton";

const GoogleAuthButton: React.FC = () => {
  return (
    <OAuthButton
      provider={new firebase.auth.GoogleAuthProvider()}
      icon={faGoogle}
      backgroundColor={"#dd4b39"}
    >
      Sign in with Google
    </OAuthButton>
  );
};

export default GoogleAuthButton;

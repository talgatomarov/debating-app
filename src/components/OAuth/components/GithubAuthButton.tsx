import React from "react";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import firebase from "firebase";
import OAuthButton from "./OAuthButton";

const GithubAuthButton: React.FC = () => {
  return (
    <OAuthButton
      provider={new firebase.auth.GithubAuthProvider()}
      icon={faGithub}
      backgroundColor="#24292e"
    >
      Sign in with Github
    </OAuthButton>
  );
};

export default GithubAuthButton;

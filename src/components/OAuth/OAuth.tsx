import React from "react";
import GoogleAuthButton from "./components/GoogleAuthButton";
import FacebookAuthButton from "./components/FacebookAuthButton";
import { Grid } from "@material-ui/core";
import GithubAuthButton from "./components/GithubAuthButton";

const OAuth: React.FC = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <GoogleAuthButton />
      </Grid>
      <Grid item xs={12}>
        <FacebookAuthButton />
      </Grid>
      <Grid item xs={12}>
        <GithubAuthButton />
      </Grid>
    </Grid>
  );
};

export default OAuth;

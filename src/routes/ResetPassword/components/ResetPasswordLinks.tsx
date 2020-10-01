import React from "react";
import { Grid, Link } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";

const ResetPasswordLinks: React.FC = () => {
  return (
    <Grid container>
      <Grid item xs>
        <Link component={RouterLink} to="/signin" variant="body2">
          Sign in
        </Link>
      </Grid>
      <Grid item>
        <Link component={RouterLink} to="/signup" variant="body2">
          Don't have an account?
        </Link>
      </Grid>
    </Grid>
  );
};

export default ResetPasswordLinks;

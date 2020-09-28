import * as React from "react";
import { Grid, Link } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";

const SignUpLinks: React.FC = () => {
  return (
    <Grid container>
      <Grid item xs>
        <Link variant="body2">Forgot password?</Link>
      </Grid>
      <Grid item>
        <Link component={RouterLink} to="/signup" variant="body2">
          Don't have an account?
        </Link>
      </Grid>
    </Grid>
  );
};

export default SignUpLinks;

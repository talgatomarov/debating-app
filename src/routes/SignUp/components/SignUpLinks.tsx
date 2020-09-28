import * as React from "react";
import { Grid, Link } from "@material-ui/core";
import { Link as RouterLink } from "react-router-dom";

const SignUpLinks: React.FC = () => {
  return (
    <Grid container justify="flex-end">
      <Grid item>
        <Link component={RouterLink} to="/signin" variant="body2">
          Already have an account?
        </Link>
      </Grid>
    </Grid>
  );
};

export default SignUpLinks;

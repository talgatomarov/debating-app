import * as React from "react";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";

const SignUpLinks: React.FC = () => {
  return (
    <Grid container>
      <Grid item xs>
        <Link variant="body2">Forgot password?</Link>
      </Grid>
      <Grid item>
        <Link href="#" variant="body2">
          Don't have an account?
        </Link>
      </Grid>
    </Grid>
  );
};

export default SignUpLinks;

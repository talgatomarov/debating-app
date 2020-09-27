import * as React from "react";
import { Grid, Link } from "@material-ui/core";

const SignUpLinks: React.FC = () => {
  return (
    <Grid container justify="flex-end">
      <Grid item>
        <Link href="#" variant="body2">
          Already have an account?
        </Link>
      </Grid>
    </Grid>
  );
};

export default SignUpLinks;

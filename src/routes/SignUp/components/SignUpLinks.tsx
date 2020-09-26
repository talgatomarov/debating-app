import * as React from "react";
import Grid from "@material-ui/core/Grid";
import Link from "@material-ui/core/Link";

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

import React from "react";
import { AuthLayout } from "containers/layout";
import SignInForm from "./components/SignInForm";
import SignInLinks from "./components/SignInLinks";
import OAuth from "components/OAuth/OAuth";
import { Divider, makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  divider: {
    marginTop: "16px",
    marginBottom: "8px",
    width: "100%",
  },
  dividerText: {
    padding: "8px 0",
  },
}));

const SignUp: React.FC = () => {
  const classes = useStyles();

  return (
    <AuthLayout title="Sign In">
      <SignInForm />
      <SignInLinks />
      <Divider variant="middle" className={classes.divider} />
      <Typography variant="body1" className={classes.dividerText}>
        or
      </Typography>
      <OAuth />
    </AuthLayout>
  );
};

export default SignUp;

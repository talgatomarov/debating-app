import React from "react";
import { AuthLayout } from "containers/layout";
import SignUpForm from "./components/SignUpForm";
import SignUpLinks from "./components/SignUpLinks";
import { Divider, Typography, makeStyles } from "@material-ui/core";
import OAuth from "components/OAuth/OAuth";

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
    <AuthLayout title="Sign Up">
      <SignUpForm />
      <SignUpLinks />
      <Divider variant="middle" className={classes.divider} />
      <Typography variant="body1" className={classes.dividerText}>
        or
      </Typography>
      <OAuth />
    </AuthLayout>
  );
};

export default SignUp;

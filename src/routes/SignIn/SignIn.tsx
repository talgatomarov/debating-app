import * as React from "react";
import { AuthLayout } from "containers/layouts";
import SignInForm from "./components/SignInForm";
import SignInLinks from "./components/SignInLinks";

const SignUp: React.FC = () => {
  return (
    <AuthLayout title="Sign In">
      <SignInForm />
      <SignInLinks />
    </AuthLayout>
  );
};

export default SignUp;

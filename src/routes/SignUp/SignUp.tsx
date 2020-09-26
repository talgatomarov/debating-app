import * as React from "react";
import { AuthLayout } from "containers/layouts";
import SignUpForm from "./components/SignUpForm";
import SignUpLinks from "./components/SignUpLinks";

const SignUp: React.FC = () => {
  return (
    <AuthLayout title="Sign Up">
      <SignUpForm />
      <SignUpLinks />
    </AuthLayout>
  );
};

export default SignUp;

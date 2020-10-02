import React from "react";
import { AuthLayout } from "containers/layouts";
import ResetPasswordForm from "./components/ResetPasswordForm";
import ResetPasswordLinks from "./components/ResetPasswordLinks";

const ResetPassword: React.FC = () => {
  return (
    <AuthLayout title="Reset Password">
      <p>
        Please enter your email address. You will receive a link to create a new
        password via email.
      </p>
      <ResetPasswordForm />
      <ResetPasswordLinks />
    </AuthLayout>
  );
};

export default ResetPassword;

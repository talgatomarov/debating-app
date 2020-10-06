import React from "react";
import { Route, Redirect, useLocation, RouteProps } from "react-router-dom";
import { observer } from "mobx-react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "app";
import { CircularProgress, Box } from "@material-ui/core";

interface PrivateRouteProps extends RouteProps {
  redirect?: string;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({
  children,
  redirect = "/signin",
  ...rest
}) => {
  const [user, loading] = useAuthState(auth);
  const location = useLocation();

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (user) {
    return <Route {...rest}>{children}</Route>;
  }

  return <Redirect to={{ pathname: redirect, state: { from: location } }} />;
};

export default PrivateRoute;

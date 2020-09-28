import * as React from "react";
import { Route, Redirect, useLocation, RouteProps } from "react-router-dom";
import { observer } from "mobx-react";
import { useStores } from "hooks";
import { CircularProgress, Box } from "@material-ui/core";

const PrivateRoute: React.FC<RouteProps> = observer(({ children, ...rest }) => {
  const { authStore } = useStores();
  const location = useLocation();

  if (authStore.loading) {
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

  if (authStore.user) {
    return <Route {...rest}>{children}</Route>;
  }

  return <Redirect to={{ pathname: "/signin", state: { from: location } }} />;
});

export default PrivateRoute;

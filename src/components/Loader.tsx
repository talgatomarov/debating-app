import React, { FC } from "react";
import { Box, CircularProgress } from "@material-ui/core";

const Loader: FC = () => {
  return (
    <Box display="flex" justifyContent="center" data-testid="loading">
      <CircularProgress />
    </Box>
  );
};

export default Loader;

import React from "react";
import { Typography, Box } from "@material-ui/core";

const Footer: React.FC = () => {
  return (
    <Box padding="32px 0">
      <Typography variant="body2" color="textSecondary" align="center">
        {"Nazarbayev University Senior Project "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </Box>
  );
};

export default Footer;

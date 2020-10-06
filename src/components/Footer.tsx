import React from "react";
import { Typography } from "@material-ui/core";

const Footer: React.FC = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Nazarbayev University Senior Project "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

export default Footer;

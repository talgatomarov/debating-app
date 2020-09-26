import React from "react";
import { Typography, Box, CssBaseline, Container } from "@material-ui/core";

const Footer = () => {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {"Nazarbayev University Senior Project "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
};

const AuthLayout = (props: any) => {
  const { children } = props;

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      {children}
      <Box mt={8}>
        <Footer />
      </Box>
    </Container>
  );
};

export default AuthLayout;

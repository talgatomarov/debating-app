import React from "react";
import { CssBaseline } from "@material-ui/core";
import "fontsource-roboto";
import { StoresProvider } from "contexts";
import Router from "./Router";

const App: React.FC = () => {
  return (
    <>
      <StoresProvider>
        <CssBaseline />
        <Router />
      </StoresProvider>
    </>
  );
};

export default App;

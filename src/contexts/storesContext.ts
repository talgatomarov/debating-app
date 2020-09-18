import * as React from "react";
import { AuthStore } from "stores";

export const storesContext = React.createContext({
  authStore: new AuthStore(),
});

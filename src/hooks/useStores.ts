import React from "react";
import { storesContext } from "contexts";
import { AuthStore } from "stores";

export const useStores = (): { authStore: AuthStore } => {
  return React.useContext(storesContext);
};

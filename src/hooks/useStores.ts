import React from "react";
import { StoresContext, Stores } from "contexts";

export const useStores = (): Stores => {
  return React.useContext(StoresContext);
};

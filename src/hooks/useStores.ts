import React from "react";
import { storesContext } from "contexts";
import { AuthStore, RoomStore } from "stores";

export const useStores = (): { authStore: AuthStore; roomStore: RoomStore } => {
  return React.useContext(storesContext);
};

import React from "react";
import { storesContext } from "contexts";
import { RoomStore } from "stores";

export const useStores = (): { roomStore: RoomStore } => {
  return React.useContext(storesContext);
};

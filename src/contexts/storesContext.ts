import React from "react";
import { RoomStore } from "stores";

export const storesContext = React.createContext({
  roomStore: new RoomStore(),
});

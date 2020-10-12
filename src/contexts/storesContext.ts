import React from "react";
import { AuthStore, RoomStore } from "stores";

export const storesContext = React.createContext({
  authStore: new AuthStore(),
  roomStore: new RoomStore(),
});

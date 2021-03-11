import React from "react";
import { roomStore, userStore, RoomStore, UserStore } from "stores";

export interface Stores {
  roomStore: RoomStore;
  userStore: UserStore;
}

const stores: Stores = {
  userStore: userStore,
  roomStore: roomStore,
};

export const StoresContext = React.createContext<Stores>(stores);

export const StoresProvider: React.FC = ({ children }) => {
  return (
    <StoresContext.Provider value={stores}>{children}</StoresContext.Provider>
  );
};

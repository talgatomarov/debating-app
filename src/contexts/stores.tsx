import React from "react";
import { RoomStore, UserStore } from "stores";

export interface Stores {
  roomStore: RoomStore;
  userStore: UserStore;
}

const stores: Stores = {
  roomStore: new RoomStore(),
  userStore: new UserStore(),
};

export const StoresContext = React.createContext<Stores>(stores);

export const StoresProvider: React.FC = ({ children }) => {
  return (
    <StoresContext.Provider value={stores}>{children}</StoresContext.Provider>
  );
};

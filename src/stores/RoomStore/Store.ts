import { Room } from "interfaces/Room";
import { observable } from "mobx";
import app from "app";

class RoomStore {
  @observable room: Room | null = null;

  constructor() {
    app.firestore().collection("rooms");
  }
}

export default RoomStore;

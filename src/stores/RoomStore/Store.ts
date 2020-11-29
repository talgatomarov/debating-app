import { observable } from "mobx";
import { IRoomStore } from "./interfaces";

class RoomStore implements IRoomStore {
  @observable roomId!: string;
  @observable players!: string[];
}

export default RoomStore;

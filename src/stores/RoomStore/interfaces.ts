import { User } from "firebase";

export interface IRoomStore {
  roomId: string;
  players: IPlayerModel[];
}

export interface IPlayerModel {
  username: string;
  ref: any;
}

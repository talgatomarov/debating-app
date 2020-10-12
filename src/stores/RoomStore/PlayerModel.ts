import { observable } from "mobx";
import { IPlayerModel } from "./interfaces";
import { User } from "firebase";

class PlayerModel implements IPlayerModel {
  @observable username!: string;
  @observable ref!: any;
}

export default PlayerModel;

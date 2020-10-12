import { observable, action } from "mobx";
import { IRoomStore, IPlayerModel } from "./interfaces";
import firebase from "firebase/app";
import PlayerModel from "./PlayerModel";

class RoomStore implements IRoomStore {
  @observable roomId!: string;
  @observable players!: IPlayerModel[];

  @action.bound getPlayersbyRoomId() {
    const database = firebase.firestore();
    this.roomId = "D3MThEXAUCXYdHV9teOd";
    var playersRef = database.collection("rooms").doc(this.roomId);
    var players: IPlayerModel[] = [];
    playersRef.get().then(function (doc) {
      if (doc.exists) {
        console.log("doc data: " + doc.data);
        // doc.data.forEach((p: string) => {
        // const player = new PlayerModel();
        // player.username = p;
        // players.push(player);
      }
    });
    this.players = players;
    console.log(this.players);
  }
}

export default RoomStore;

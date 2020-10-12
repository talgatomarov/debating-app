import { observable, action } from "mobx";
import { IRoomStore, IPlayerModel } from "./interfaces";
import firebase from "firebase/app";
import "firebase/firestore";

class RoomStore implements IRoomStore {
  @observable roomId!: string;
  @observable players!: IPlayerModel[];

  @action.bound async getPlayersbyRoomId() {
    const database = firebase.firestore();
    const playersRef = database.collection("rooms").doc("D3MThEXAUCXYdHV9teOd");
    var players: IPlayerModel[] = [];
    const observer = playersRef.onSnapshot(
      (playersSnapshot: any) => {
        console.log(playersSnapshot.data().players);
        players = playersSnapshot.data().players;
      },
      (err: any) => {
        console.log("error: " + err);
      }
    );

    this.players = players;
    console.log(this.players);
  }
}

export default RoomStore;

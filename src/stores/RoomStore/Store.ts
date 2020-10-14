import { observable, action, runInAction } from "mobx";
import { IRoomStore } from "./interfaces";
import firebase from "firebase/app";
import "firebase/firestore";

class RoomStore implements IRoomStore {
  @observable roomId!: string;
  @observable players!: string[];

  @action.bound async getPlayersbyRoomId(id: string): Promise<void> {
    const database = firebase.firestore();
    const playersRef = database.collection("rooms").doc(id);
    playersRef.get().then(
      (playersDoc: any) => {
        console.log(playersDoc.data().players);
        runInAction("setPLayers", () => {
          this.players = playersDoc.data().players;
          console.log(this.players);
        });
      },
      (err) => {
        console.log("error: " + err);
      }
    );
  }
}

export default RoomStore;

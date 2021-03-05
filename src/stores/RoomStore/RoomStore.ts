import { Format, Stage } from "interfaces/Room";
import { Judge } from "interfaces/Judge";
import { autorun, observable } from "mobx";
import app from "app";
import UserStore from "stores/UserStore";

class RoomStore {
  @observable id?: string;
  @observable name?: string;
  @observable stage?: Stage;
  @observable format?: Format;
  @observable privacy?: string;
  @observable motion?: string;
  @observable infoslide?: string | null;
  @observable owner?: string;
  @observable players?: string[];
  @observable judges?: Judge[];
  @observable chair?: Judge | null;
  @observable positions?: any;
  userStore: UserStore;

  constructor(userStore: UserStore) {
    this.userStore = userStore;

    autorun(() => {
      app
        .firestore()
        .collection("rooms")
        .doc(userStore.roomId)
        .onSnapshot(
          (doc) => {
            const data = doc.data();

            if (data) {
              this.id = userStore.roomId;
              this.name = data.name;
              this.stage = data.stage;
              this.format = data.format;
              this.privacy = data.privacy;
              this.motion = data.motion;
              this.infoslide = data.infoslide;
              this.owner = data.owner;
              this.players = data.players;
              this.judges = data.judges;
              this.chair = data.chair;
              this.positions = data.positions;
            }
          },
          (error) => console.log(error.message)
        );
    });
  }
}

export default RoomStore;

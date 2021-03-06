import { Format, Room, Stage } from "interfaces/Room";
import { Judge } from "interfaces/Judge";
import { autorun, observable } from "mobx";
import app from "app";
import axios from "axios";
import UserStore from "stores/UserStore";
import { createPositions } from "./Positions";

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

  async create({
    name,
    format,
    privacy,
    motion,
    infoslide,
  }: {
    name: string;
    format: Format;
    privacy: string;
    motion: string;
    infoslide?: string;
  }): Promise<any> {
    const authToken = await this.userStore.currentUser?.getIdToken(true);

    const data: Room = {
      name: name,
      stage: Stage.formation,
      format: format,
      privacy: privacy,
      motion: motion,
      infoslide: infoslide,
      owner: this.userStore.currentUser!.uid,
      players: [this.userStore.currentUser!.uid],
      positions: createPositions(format),
      judges: [],
      chair: null,
      timerInfo: {
        timerOn: false,
        speechStart: 0,
        timeLeft: 420000,
      },
    };

    const response = await axios.post("/api/rooms", data, {
      headers: {
        authorization: `Bearer ${authToken}`,
      },
    });

    return response.data;
  }

  async join(roomId: string) {
    const authToken = await this.userStore.currentUser!.getIdToken(true);
    await axios.post(`/api/rooms/${roomId}/join`, null, {
      headers: {
        authorization: `Bearer ${authToken}`,
      },
    });
  }
}

export default RoomStore;

import { Format, Room, Stage } from "interfaces/Room";
import { Judge } from "interfaces/Judge";
import { autorun, observable } from "mobx";
import app from "app";
import axios, { AxiosResponse } from "axios";
import { createPositions } from "./Positions";
import userStore from "stores/UserStore";

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
  @observable error: Error | null = null;
  @observable loading = true;

  constructor() {
    autorun(() => {
      this.error = null;

      // Since roomStore depends on userStore, if userStore is loading then roomStore is also loading
      if (userStore.loading) {
        this.loading = true;
      } else if (userStore.roomId) {
        this.loading = true;
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
              this.loading = false;
            },
            (error) => {
              this.loading = false;
              this.error = error;
            }
          );
      } else {
        this.loading = false;
      }
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
    const authToken = await userStore.currentUser?.getIdToken(true);

    const data: Room = {
      name: name,
      stage: Stage.formation,
      format: format,
      privacy: privacy,
      motion: motion,
      infoslide: infoslide,
      owner: userStore.currentUser!.uid,
      players: [userStore.currentUser!.uid],
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

  async join(roomId: string): Promise<AxiosResponse> {
    const authToken = await userStore.currentUser!.getIdToken(true);
    return await axios.post(`/api/rooms/${roomId}/join`, null, {
      headers: {
        authorization: `Bearer ${authToken}`,
      },
    });
  }

  async selectPosition(teamName: string, speakerTitle: string): Promise<void> {
    const requestBody = {
      displayName: userStore.currentUser!.displayName,
      teamName,
      speakerTitle,
    };

    const authToken = await userStore.currentUser!.getIdToken(true);

    await axios.post(`/api/rooms/${this.id}/select`, requestBody, {
      headers: {
        authorization: `Bearer ${authToken}`,
      },
    });
  }

  async adjudicate(): Promise<void> {
    const requestBody = {
      displayName: userStore.currentUser!.displayName,
      adjudicate: true,
    };

    const authToken = await userStore.currentUser!.getIdToken(true);

    await axios.post(`/api/rooms/${this.id}/select`, requestBody, {
      headers: {
        authorization: `Bearer ${authToken}`,
      },
    });
  }

  async startPreparation(): Promise<void> {
    const authToken = await userStore.currentUser!.getIdToken(true);

    await axios.post(`/api/rooms/${this.id}/startPreparation`, null, {
      headers: {
        authorization: `Bearer ${authToken}`,
      },
    });
  }

  async startRound(): Promise<void> {
    const authToken = await userStore.currentUser!.getIdToken(true);

    await axios.post(`/api/rooms/${this.id}/startRound`, null, {
      headers: {
        authorization: `Bearer ${authToken}`,
      },
    });
  }

  async exit(): Promise<void> {
    const authToken = await userStore.currentUser!.getIdToken(true);

    await axios.post(`/api/rooms/exit`, null, {
      headers: {
        authorization: `Bearer ${authToken}`,
      },
    });

    userStore.roomId = undefined;
    userStore.meetingName = undefined;
    userStore.meetingToken = undefined;
  }
}

const roomStore = new RoomStore();
export default roomStore;
export { RoomStore };

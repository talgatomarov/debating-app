import { observable } from "mobx";
import app from "app";

class UserStore {
  @observable uid: string | null = null;
  @observable displayName: string | null = null;
  @observable email: string | null = null;
  @observable roomId?: string;
  @observable meetingName?: string;
  @observable meetingToken?: string;

  constructor() {
    app.auth().onAuthStateChanged((user) => {
      if (user) {
        this.uid = user.uid;
        this.displayName = user.displayName;
        this.email = user.email;

        app
          .firestore()
          .collection("users")
          .doc(this.uid)
          .onSnapshot((doc) => {
            this.roomId = doc.data()?.roomId;
            this.meetingName = doc.data()?.meetingName;
            this.meetingToken = doc.data()?.meetingToken;
          });
      }
    });
  }
}

export default UserStore;

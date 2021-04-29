import { observable } from "mobx";
import app from "app";
import firebase from "firebase";

class UserStore {
  @observable currentUser: firebase.User | null = null;
  @observable roomId?: string;
  @observable meetingName?: string;
  @observable meetingToken?: string;
  @observable loading = true;
  @observable error: Error | null = null;

  constructor() {
    app.auth().onAuthStateChanged((user) => {
      if (user) {
        this.currentUser = user;
        this.loading = true;
        app
          .firestore()
          .collection("users")
          .doc(user.uid)
          .onSnapshot((doc) => {
            this.roomId = doc.data()?.roomId;
            this.meetingName = doc.data()?.meetingName;
            this.meetingToken = doc.data()?.meetingToken;
            this.loading = false;
          });
      }
    });
  }
}

const userStore = new UserStore();

export default userStore;
export { UserStore };

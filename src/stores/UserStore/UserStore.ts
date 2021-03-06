import { observable } from "mobx";
import app from "app";
import firebase from "firebase";

class UserStore {
  @observable currentUser: firebase.User | null = null;
  @observable roomId?: string;
  @observable meetingName?: string;
  @observable meetingToken?: string;

  constructor() {
    app.auth().onAuthStateChanged((user) => {
      if (user) {
        this.currentUser = user;

        app
          .firestore()
          .collection("users")
          .doc(user.uid)
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

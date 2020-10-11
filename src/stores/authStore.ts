import { observable } from "mobx";
import app from "app";

export class AuthStore {
  @observable user: firebase.User | null = null;
  @observable loading = false;

  constructor() {
    this.loading = true;
    app.auth().onAuthStateChanged((user) => {
      this.user = user;
      this.loading = false;
    });
  }
}

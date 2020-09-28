import { observable } from "mobx";
import { auth } from "app";

export class AuthStore {
  @observable user: firebase.User | null = null;
  @observable loading = false;

  constructor() {
    this.loading = true;
    auth.onAuthStateChanged((user) => {
      this.user = user;
      this.loading = false;
    });
  }
}

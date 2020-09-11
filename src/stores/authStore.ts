import { observable, action } from "mobx";
import firebase from "firebaseConfig";
import { User } from "interfaces";

export class AuthStore {
  @observable user: User | null = null;

  setUser(userCredential: firebase.auth.UserCredential): void {
    this.user = {
      uid: userCredential.user?.uid,
      email: userCredential.user?.email,
      emailVerified: userCredential.user?.emailVerified,
      displayName: userCredential.user?.displayName,
      photoURL: userCredential.user?.photoURL,
    };
  }

  @action async createUserWithEmailAndPassword(
    email: string,
    password: string
  ): Promise<void> {
    const userCredential = await firebase
      .auth()
      .createUserWithEmailAndPassword(email, password);

    this.setUser(userCredential);
  }
}

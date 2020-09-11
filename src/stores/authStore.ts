import { observable, action } from "mobx";
import firebase from "../firebase";
import { User, AuthError } from "../interfaces";

export class AuthStore {
  @observable user: User | null = null;
  @observable authError: AuthError | null = null;

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
    try {
      const userCredential = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);

      this.setUser(userCredential);
      this.authError = null;
    } catch (error) {
      this.authError = error;
    }
  }
}

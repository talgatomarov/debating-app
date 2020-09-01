import { observable, action } from "mobx";
import firebase from "../firebase";

interface User {
  uid: string | undefined;
  email: string | null | undefined;
  emailVerified: boolean | undefined;
  displayName: string | null | undefined;
  photoURL: string | null | undefined;
}

interface AuthError {
  code: string;
  message: string;
}

export class AuthStore {
  @observable user: User | null = null;
  @observable authError: AuthError | null = null;

  @action async createUserWithEmailAndPassword(
    email: string,
    password: string
  ): Promise<void> {
    try {
      const userCredential = await firebase
        .auth()
        .signInWithEmailAndPassword(email, password);
      this.user = userCredential.user;
      this.authError = null;
    } catch (error) {
      this.authError = error;
    }
  }
}

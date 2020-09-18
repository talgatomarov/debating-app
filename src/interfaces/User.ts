export default interface User {
  uid: string | undefined;
  email: string | null | undefined;
  emailVerified: boolean | undefined;
  displayName: string | null | undefined;
  photoURL: string | null | undefined;
}

import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

export const userOnCreate = functions.auth.user().onCreate((user) => {
  return admin.firestore().collection("users").doc(user.uid).set({
    email: user.email,
    displayName: user.displayName,
    currentRoom: null,
    currentMeeting: null,
    meetingToken: null,
  });
});

export const userOnDelete = functions.auth.user().onDelete((user) => {
  const doc = admin.firestore().collection("users").doc(user.uid);
  return doc.delete();
});

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/functions";

// It is not a security issue to expose this config
const firebaseConfig = {
  apiKey: "AIzaSyCXiRfBjennpAy6abv-REAl5lSwJhMspEA",
  authDomain: "debating-app.firebaseapp.com",
  databaseURL: "https://debating-app.firebaseio.com",
  projectId: "debating-app",
  storageBucket: "debating-app.appspot.com",
  messagingSenderId: "574516587186",
  appId: "1:574516587186:web:6e43005181acc3f9d9b7ab",
  measurementId: "G-8P064MFYN5",
};

const app = firebase.initializeApp(firebaseConfig);

// TODO: Maybe it would better to setup it via environmental variables?
// eslint-disable-next-line no-restricted-globals
if (location.hostname === "localhost") {
  app.firestore().useEmulator("localhost", 8080);
  app.auth().useEmulator("http://localhost:9099/");
}

export default app;

import * as express from "express";
import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: "https://debating-app.firebaseio.com",
});

const app = express();

app.get("/rooms", (req, res) => {
  res.send("get room");
});

app.post("/rooms", (req, res) => {
  res.send("post room");
});

exports.widgets = functions.https.onRequest(app);

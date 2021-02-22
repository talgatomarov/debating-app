import * as express from "express";
import * as admin from "firebase-admin";
import * as functions from "firebase-functions";

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: "https://debating-app.firebaseio.com",
});

const app = express();
const router = express.Router();

router.get("/rooms", (req, res) => {
  res.send("get room");
});

router.post("/rooms", (req, res) => {
  res.send("post room");
});

app.use("/api", router);

exports.api = functions.https.onRequest(app);

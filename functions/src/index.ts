import * as functions from "firebase-functions";
import * as express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Test");
});

exports.daily = functions.https.onRequest(app);

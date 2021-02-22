import * as express from "express";
import * as admin from "firebase-admin";
import * as functions from "firebase-functions";
import axios from "axios";
import { checkIfAuthenticated } from "./utils";

admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: "https://debating-app.firebaseio.com",
});

export const dailyKey = functions.config().daily.key;

const app = express();
const router = express.Router();

router.use(checkIfAuthenticated);

router.get("/rooms", async (req, res) => {
  const url = "https://api.daily.co/v1/rooms";

  try {
    const result = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${dailyKey}`,
      },
      params: req.query,
    });

    res.send(result.data);
  } catch (error) {
    res.status(503).send({ error: error.message });
  }
});

router.post("/rooms", async (req, res) => {
  const url = "https://api.daily.co/v1/rooms";

  try {
    const result = await axios.post(url, req.body, {
      headers: {
        Authorization: `Bearer ${dailyKey}`,
      },
      params: req.query,
    });

    return result.data;
  } catch (error) {
    res.status(503).send({ error: error.message });
  }
});

app.use("/api", router);

exports.api = functions.https.onRequest(app);

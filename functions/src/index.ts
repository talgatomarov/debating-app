import * as functions from "firebase-functions";
import * as express from "express";
import axios from "axios";

const app = express();
const router = express.Router();

const dailyKey = functions.config().daily.key;

router.get("/rooms", (req, res) => {
  const url = "https://api.daily.co/v1/rooms";

  return axios.get(url, {
    headers: {
      Authorization: `Bearer ${dailyKey}`,
    },
  });
});

app.use("/daily", router);

exports.daily = functions.https.onRequest(app);

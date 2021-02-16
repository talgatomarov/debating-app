import * as functions from "firebase-functions";
import * as express from "express";

const app = express();
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Test");
});

app.use("/daily", router);

exports.daily = functions.https.onRequest(app);

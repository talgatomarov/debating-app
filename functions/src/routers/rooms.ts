import { Router } from "express";
import axios from "axios";
import { checkIfAuthenticated } from "../utils";
import { dailyKey } from "../config";

const rooms = Router();

rooms.use(checkIfAuthenticated);

rooms.get("/rooms", async (req, res) => {
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

rooms.post("/rooms", async (req, res) => {
  const url = "https://api.daily.co/v1/rooms";

  try {
    const result = await axios.post(url, req.body, {
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

export default rooms;

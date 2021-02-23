import { Router } from "express";
import * as admin from "firebase-admin";
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
  // const url = "https://api.daily.co/v1/rooms";
  // const { name, privacy } = req.body;
  try {
    // const result = await axios.post(
    //   url,
    //   { name, privacy },
    //   {
    //     headers: {
    //       Authorization: `Bearer ${dailyKey}`,
    //     },
    //     params: req.query,
    //   }
    // );

    // const id = result.data.id;
    const ref = await admin.firestore().collection("rooms").add(req.body);
    await admin.auth().setCustomUserClaims(req.authId!, { roomId: ref.id });

    res.send({ id: ref.id });
  } catch (error) {
    res.status(503).send({ error: error.message });
  }
});

rooms.post("/rooms/:roomId/join", async (req, res) => {
  try {
    const { roomId } = req.params;
    const { displayName, uid } = req.body;
    const ref = admin.firestore().collection("rooms").doc(roomId);
    const doc = await ref.get();

    if (!doc.data()?.playerIds.includes(req.authId)) {
      await ref.update({
        players: admin.firestore.FieldValue.arrayUnion({
          uid: uid,
          name: displayName,
        }),
      });
    }

    await admin.auth().setCustomUserClaims(req.authId!, { roomId: ref.id });

    res.send({ id: ref.id });
  } catch (error) {
    res.status(503).send({ error: error.message });
  }
});

export default rooms;

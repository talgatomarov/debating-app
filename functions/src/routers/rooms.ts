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
    console.log(error);
  }
});

rooms.post("/rooms", async (req, res) => {
  try {
    const ref = await admin.firestore().collection("rooms").add(req.body);
    await admin.auth().setCustomUserClaims(req.authId!, { roomId: ref.id });

    res.send({ id: ref.id });
  } catch (error) {
    res.status(503).send({ error: error.message });
    console.log(error);
  }
});

rooms.post("/rooms/:roomId/join", async (req, res) => {
  try {
    const { roomId } = req.params;
    const { displayName, uid } = req.body;
    const ref = admin.firestore().collection("rooms").doc(roomId);
    const doc = await ref.get();

    if (!doc.data()?.players.includes(req.authId)) {
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
    console.log(error);
  }
});

rooms.post("/rooms/:roomId/select", async (req, res) => {
  try {
    const { roomId } = req.params;
    const { displayName, teamName, speakerTitle } = req.body;

    const ref = admin.firestore().collection("rooms").doc(roomId);
    const doc = await ref.get();

    if (doc.data()?.players.includes(req.authId)) {
      const positions = doc.data()?.positions;

      if (!positions[teamName][speakerTitle]) {
        Object.keys(positions).forEach((t) => {
          Object.keys(positions[t]).forEach((s) => {
            if (positions[t][s]?.uid === req.authId) {
              positions[t][s] = null;
            }
          });
        });

        positions[teamName][speakerTitle] = {
          uid: req.authId,
          name: displayName,
        };

        await ref.update({
          positions: positions,
        });

        return res.status(200).send();
      } else {
        return res.status(400).send("Position is not empty");
      }
    }
  } catch (error) {
    console.log(error);
    return res.status(503).send({ error: error.message });
  }
});

export default rooms;

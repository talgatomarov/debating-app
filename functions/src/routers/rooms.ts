import { Router } from "express";
import * as admin from "firebase-admin";
import { checkIfAuthenticated } from "../utils";
import { createMeeting, createMeetingToken } from "../daily";

const rooms = Router();

rooms.use(checkIfAuthenticated);

rooms.post("/rooms", async (req, res) => {
  // Enpoints creates a new room
  try {
    const roomRef = await admin.firestore().collection("rooms").add(req.body);
    const userRef = admin.firestore().collection("users").doc(req.authId!);

    await userRef.update({
      roomId: roomRef.id,
    });

    res.send({ id: roomRef.id });
  } catch (error) {
    res.status(503).send({ error: error.message });
    console.log(error);
  }
});

rooms.post("/rooms/:roomId/join", async (req, res) => {
  try {
    const { roomId } = req.params;
    const ref = admin.firestore().collection("rooms").doc(roomId);
    const doc = await ref.get();

    // Add user to the players list if he is not already there
    if (!doc.data()?.players.includes(req.authId)) {
      await ref.update({
        players: admin.firestore.FieldValue.arrayUnion(req.authId),
      });
    }

    const userRef = admin.firestore().collection("users").doc(req.authId!);

    // Set up roomId
    // Info about room is stored at "users" firestore collection
    await userRef.update({
      roomId: roomId,
    });

    res.send({ id: ref.id });
    console.log(`User ${req.authId} successfully joined ${roomId}`);
  } catch (error) {
    res.status(503).send({ error: error.message });
    console.log(error);
  }
});

rooms.post("/rooms/:roomId/select", async (req, res) => {
  try {
    const { roomId } = req.params;
    // Request contains either (teamName and speakerTitle), or adjudicate flag is set to true
    // If teamName, speakerTitle, and adjudicate fields are all present, then adjudicate option will be prioritized
    const { displayName, teamName, speakerTitle, adjudicate } = req.body;

    const ref = admin.firestore().collection("rooms").doc(roomId);
    const doc = await ref.get();

    // User has to be listed in players array field
    if (doc.data()?.players.includes(req.authId)) {
      const positions = doc.data()?.positions;
      let judges = doc.data()?.judges || [];

      // Clear previous position
      Object.keys(positions).forEach((t) => {
        Object.keys(positions[t]).forEach((s) => {
          if (positions[t][s]?.uid === req.authId) {
            positions[t][s] = null;
          }
        });
      });
      judges = judges.filter(
        (judge: { uid: string; name: string }) => judge.uid !== req.authId
      );

      if (adjudicate) {
        judges.push({
          uid: req.authId,
          name: displayName,
        });
      } else {
        // User does not wish to adjudicate
        if (!positions[teamName][speakerTitle]) {
          positions[teamName][speakerTitle] = {
            uid: req.authId,
            name: displayName,
          };
        } else {
          return res.status(400).send("Position is not empty");
        }
      }
      await ref.update({
        positions: positions,
        judges: judges,
      });

      res.status(200).send();
    }
  } catch (error) {
    console.log(error);
    return res.status(503).send({ error: error.message });
  }
});

rooms.post("/rooms/:roomId/startPreparation", async (req, res) => {
  try {
    const { roomId } = req.params;

    const ref = admin.firestore().collection("rooms").doc(roomId);
    const doc = await ref.get();

    const owner = doc.data()?.owner;
    const positions = doc.data()?.positions;
    const judges = doc.data()?.judges;

    // Only room owner can start preparation
    if (req.authId !== owner) {
      return res.status(401).send("Only owner can start preparation");
    }

    // Tala's note: idk how to properly iterate through the object
    // If you have better way, feel free to change
    Object.keys(positions).forEach(async (team) => {
      // Create Daily meeting for each team
      const createMeetingResponse = await createMeeting();
      const meetingName = createMeetingResponse.name;

      Object.keys(positions[team]).forEach(async (speaker) => {
        const user = positions[team][speaker];

        if (user) {
          const isOwner = user.uid === owner;

          // Create Meeting Token for each speaker
          // Note: users will not be able to access the meeting without token
          const { token } = await createMeetingToken(meetingName, isOwner);

          const userRef = admin.firestore().collection("users").doc(user.uid!);

          // Set Meeting Token for each speaker
          // meetingName and meetingToken is stored at "users" firestore collection
          await userRef.update({
            roomId: roomId,
            meetingToken: token,
            meetingName: meetingName,
          });
        }
      });
    });

    // Create a separate meeting for judges
    const judgeMeetingResponse = await createMeeting();
    const judgeMeetingName = judgeMeetingResponse.name;

    judges.forEach(async (judge: { uid: string; name: string }) => {
      // Create Meeting Token for each judge$
      // All judges are owners of the room
      const { token } = await createMeetingToken(judgeMeetingName, true);

      const judgeRef = admin.firestore().collection("users").doc(judge.uid!);

      // Set Meeting Token for each judge
      await judgeRef.update({
        roomId: roomId,
        meetingToken: token,
        meetingName: judgeMeetingName,
      });
    });

    await ref.update({
      stage: "preparation",
    });

    res.status(200).send();
  } catch (error) {
    console.log(error);
    return res.status(503).send({ error: error.message });
  }
});

export default rooms;

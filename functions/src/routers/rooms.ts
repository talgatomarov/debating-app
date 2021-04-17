import { Router } from "express";
import * as admin from "firebase-admin";
import { checkIfAuthenticated } from "../utils";
import { createMeeting, createMeetingToken, deleteMeetings } from "../daily";

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
    const room = await admin.firestore().collection("rooms").doc(roomId).get();
    const { players } = room.data()!;

    // Add user to the players list if he is not already there
    if (!players.includes(req.authId)) {
      await room.ref.update({
        players: admin.firestore.FieldValue.arrayUnion(req.authId),
      });
    }

    // Set up roomId
    // Info about room is stored at "users" firestore collection
    await admin.firestore().collection("users").doc(req.authId!).update({
      roomId: roomId,
    });

    res.send({ id: room.ref.id });
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

    const room = await admin.firestore().collection("rooms").doc(roomId).get();
    let { players, positions, judges } = room.data()!;

    // User has to be listed in players array field
    if (players.includes(req.authId)) {
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
      await room.ref.update({
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

    const room = await admin.firestore().collection("rooms").doc(roomId).get();
    const { owner, positions, judges } = room.data()!;

    // Only room owner can start preparation
    if (req.authId !== owner) {
      return res.status(401).send("Only owner can start preparation");
    }

    const activeMeetings = [];

    // Tala's note: idk how to properly iterate through the object
    // If you know a better way, feel free to change
    Object.keys(positions).forEach(async (team) => {
      // Create Daily meeting for each team
      const createMeetingResponse = await createMeeting();
      const meetingName = createMeetingResponse.name;
      activeMeetings.push(meetingName);

      Object.keys(positions[team]).forEach(async (speaker) => {
        const user = positions[team][speaker];

        if (user) {
          const isOwner = user.uid === owner;

          // Create Meeting Token for each speaker
          // Note: users will not be able to access the meeting without token
          const { token } = await createMeetingToken(meetingName, isOwner);

          const userRef = admin.firestore().collection("users").doc(user.uid);

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
    activeMeetings.push(judgeMeetingName);

    judges.forEach(async (judge: { uid: string; name: string }) => {
      // Create Meeting Token for each judge$
      // All judges are owners of the room
      const { token } = await createMeetingToken(judgeMeetingName, true);

      const judgeRef = admin.firestore().collection("users").doc(judge.uid);

      // Set Meeting Token for each judge
      await judgeRef.update({
        roomId: roomId,
        meetingToken: token,
        meetingName: judgeMeetingName,
      });
    });

    await room.ref.update({
      stage: "preparation",
      activeMeetings: activeMeetings,
    });

    res.status(200).send();
  } catch (error) {
    console.log(error);
    return res.status(503).send({ error: error.message });
  }
});

rooms.post("/rooms/:roomId/startRound", async (req, res) => {
  try {
    const { roomId } = req.params;

    const room = await admin.firestore().collection("rooms").doc(roomId).get();
    const { judges, players, activeMeetings } = room.data()!;

    if (
      !judges.some(
        (judge: { uid: string; name: string }) => judge.uid === req.authId
      )
    ) {
      return res.status(401).send("Only judges can start round");
    }

    const createMeetingResponse = await createMeeting();
    const meetingName = createMeetingResponse.name;

    const { token: judgeToken } = await createMeetingToken(meetingName, true);
    const { token: speakerToken } = await createMeetingToken(
      meetingName,
      false
    );

    // Set meeting tokens for players
    // Note that judge is also a player
    players.forEach(async (playerId: string) => {
      const playerRef = admin.firestore().collection("users").doc(playerId);

      let token = speakerToken;
      if (
        judges.some(
          (judge: { uid: string; name: string }) => judge.uid === playerId
        )
      ) {
        token = judgeToken;
      }

      await playerRef.update({
        roomId: roomId,
        meetingToken: token,
        meetingName: meetingName,
      });
    });

    // Delete meetings from the previous stage
    await deleteMeetings(activeMeetings);

    await room.ref.update({
      stage: "ongoing",
      activeMeetings: [meetingName],
    });

    return res.status(200).send();
  } catch (error) {
    console.log(error);
    return res.status(503).send({ error: error.message });
  }
});

rooms.post("/rooms/:roomId/startDeliberation", async (req, res) => {
  try {
    const { roomId } = req.params;
    const room = await admin.firestore().collection("rooms").doc(roomId).get();
    const { judges, positions, activeMeetings } = room.data()!;

    const { name: speakerMeetingName } = await createMeeting();
    Object.values<{ uid: string; name: string }>(positions).forEach(
      async (user) => {
        const { token: speakerToken } = await createMeetingToken(
          speakerMeetingName,
          false
        );

        const speakerRef = admin.firestore().collection("users").doc(user.uid);

        await speakerRef.update({
          roomId: roomId,
          meetingToken: speakerToken,
          meetingName: speakerMeetingName,
        });
      }
    );

    const { name: judgeMeetingName } = await createMeeting();
    judges.forEach(async (judge: { uid: string; name: string }) => {
      const { token: judgeToken } = await createMeetingToken(
        judgeMeetingName,
        true
      );
      const judgeRef = admin.firestore().collection("users").doc(judge.uid);

      await judgeRef.update({
        roomId: roomId,
        meetingToken: judgeToken,
        meetingName: judgeMeetingName,
      });
    });

    // Delete meetings from the previous stage
    await deleteMeetings(activeMeetings);

    await room.ref.update({
      stage: "delibertaion",
      activeMeetings: [judgeMeetingName, speakerMeetingName],
    });

    return res.status(200).send();
  } catch (error) {
    console.log(error);
    return res.status(503).send({ error: error.message });
  }
});

rooms.post("/rooms/exit", async (req, res) => {
  try {
    const user = await admin
      .firestore()
      .collection("users")
      .doc(req.authId!)
      .get();
    const { roomId } = user.data()!;

    if (user) {
      const room = await admin
        .firestore()
        .collection("rooms")
        .doc(roomId)
        .get();
      let { players, judges, positions, activeMeetings } = room.data()!;

      if (room) {
        // Delete player from the room
        players = players.filter((uid: string) => uid !== req.authId);
        judges = judges.filter(
          ({ uid }: { uid: string }) => uid !== req.authId
        );

        if (positions) {
          Object.keys(positions).forEach((team) => {
            Object.keys(positions[team]).forEach((speaker) => {
              if (
                positions[team][speaker] &&
                positions[team][speaker].uid === req.authId
              ) {
                positions[team][speaker] = null;
              }
            });
          });
        }

        // If room is empty destroy the room
        if (players.length === 0) {
          await deleteMeetings(activeMeetings);
          await room.ref.delete();
        } else {
          await room.ref.update({ players, judges, positions, activeMeetings });
        }
      }
      // Delete player room info
      await user.ref.update({
        meetingName: null,
        meetingToken: null,
        roomId: null,
      });
    }

    res.status(200).send();
  } catch (error) {
    console.log(error);
    return res.status(503).send({ error: error.message });
  }
});

export default rooms;

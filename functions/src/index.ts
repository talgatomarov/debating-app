import * as functions from "firebase-functions";
import axios from "axios";

const dailyKey = functions.config().daily.key;

export const getRooms = functions.https.onCall(async (data, context) => {
  const url = "https://api.daily.co/v1/rooms";

  try {
    const result = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${dailyKey}`,
      },
      params: data.query,
    });

    return result.data;
  } catch (error) {
    throw new functions.https.HttpsError("unavailable", error);
  }
});

export const postRooms = functions.https.onCall(async (data, context) => {
  const url = "https://api.daily.co/v1/rooms";

  try {
    const result = await axios.post(url, data.body, {
      headers: {
        Authorization: `Bearer ${dailyKey}`,
      },
      params: data.query,
    });

    return result.data;
  } catch (error) {
    throw new functions.https.HttpsError("unavailable", error);
  }
});

import * as functions from "firebase-functions";
import axios from "axios";
import { dailyKey } from "../../config";

const getRooms = functions.https.onCall(async (data, context) => {
  if (!context.auth) {
    throw new functions.https.HttpsError(
      "unauthenticated",
      "only authenticated users are allowed"
    );
  }

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
    throw new functions.https.HttpsError("unavailable", error.message);
  }
});

export default getRooms;

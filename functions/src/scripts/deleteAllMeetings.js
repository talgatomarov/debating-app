/* eslint-disable @typescript-eslint/no-var-requires */
const axios = require("axios");
const functions = require("firebase-functions");

const dailyKey = functions.config().daily.key;

const deleteAllMeetings = async () => {
  const url = "https://api.daily.co/v1/rooms";

  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${dailyKey}`,
    },
  });

  const meetings = response.data.data;

  meetings.forEach(async (meeting) => {
    try {
      await axios.delete(`${url}/${meeting.name}`, {
        headers: {
          Authorization: `Bearer ${dailyKey}`,
        },
      });
      console.log(`Deleted ${meeting.name}`);
    } catch (error) {
      console.log(error.message);
    }
  });
};

deleteAllMeetings();

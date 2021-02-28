import axios from "axios";
import { dailyKey } from "./config";

export const createMeeting = async (
  privacy = "private",
  name?: string
): Promise<any> => {
  const url = "https://api.daily.co/v1/rooms";

  const response = await axios.post(
    url,
    {
      privacy: privacy,
      name: name,
    },
    {
      headers: {
        Authorization: `Bearer ${dailyKey}`,
      },
    }
  );

  console.log(`Meeting ${response.data.name} was created`);

  return response.data;
};

export const createMeetingToken = async (
  roomName: string,
  isOwner?: boolean
): Promise<any> => {
  const url = "https://api.daily.co/v1/meeting-tokens";

  const response = await axios.post(
    url,
    {
      properties: {
        room_name: roomName,
        is_owner: isOwner,
      },
    },
    {
      headers: {
        Authorization: `Bearer ${dailyKey}`,
      },
    }
  );

  console.log(`Create meeting token for ${roomName}`);
  return response.data;
};

export const validateMeetingToken = async (
  meetingToken: string
): Promise<any> => {
  const url = `https://api.daily.co/v1/meeting-tokens/${meetingToken}`;

  const response = await axios.post(url, null, {
    headers: {
      Authorization: `Bearer ${dailyKey}`,
    },
  });

  return response.data;
};

export const deleteMeetings = async (meetings: string[]): Promise<any> => {
  const url = "https://api.daily.co/v1/rooms";

  meetings.forEach(async (meeting) => {
    try {
      await axios.delete(`${url}/${meeting}`, {
        headers: {
          Authorization: `Bearer ${dailyKey}`,
        },
      });
      console.log(`Deleted ${meeting}`);
    } catch (error) {
      console.log(error.message);
    }
  });
};

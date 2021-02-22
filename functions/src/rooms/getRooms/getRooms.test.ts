import axios from "axios";
import getRooms from "./getRooms";
import * as functions from "firebase-functions-test";

const mockAxiosGet = jest.spyOn(axios, "get");

const testEnv = functions();

const dailyConfig = { daily: { key: "testkey", domain: "testdomain.com" } };
testEnv.mockConfig(dailyConfig);
const wrapped = testEnv.wrap(getRooms);

describe("getRooms", () => {
  test("Successful call", async () => {
    const mockResponse = { message: "Success" };
    const mockData = { query: undefined };

    mockAxiosGet.mockResolvedValueOnce({ data: mockResponse });
    const response = await wrapped(mockData, {
      auth: {
        uid: "testuid",
      },
    });

    expect(response).toEqual(mockResponse);
    expect(mockAxiosGet).toHaveBeenCalled();
  });

  test("Unauthenticated call", async () => {
    try {
      await wrapped({});
    } catch (error) {
      expect(error.code).toBe("unauthenticated");
    }
  });

  test("Failed call", async () => {
    const mockError = { message: "Failed" };
    const mockData = { query: undefined };

    mockAxiosGet.mockRejectedValueOnce(mockError);

    try {
      await wrapped(mockData, {
        auth: {
          uid: "testuid",
        },
      });
    } catch (error) {
      expect(error.code).toBe("unavailable");
      expect(error.message).toBe(mockError.message);
    }
  });
});

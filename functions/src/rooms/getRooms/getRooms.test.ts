import axios from "axios";
import getRooms from "./getRooms";
import * as functions from "firebase-functions-test";

const mockAxiosGet = jest.spyOn(axios, "get");

const testEnv = functions();

const dailyConfig = { daily: { key: "testkey", domain: "testdomain.com" } };
testEnv.mockConfig(dailyConfig);
const wrapped = testEnv.wrap(getRooms);

describe("getRooms", () => {
  it("Successful call", async () => {
    const data = { message: "Success" };
    mockAxiosGet.mockResolvedValueOnce({ data: data });
    const response = await wrapped({});

    expect(response).toEqual(data);
    expect(mockAxiosGet).toHaveBeenCalled();
  });

  it("Failed call", async () => {
    const mockError = { message: "Failed" };
    mockAxiosGet.mockRejectedValueOnce(mockError);

    try {
      await wrapped({});
    } catch (error) {
      expect(error.code).toBe("unavailable");
      expect(error.message).toBe(mockError.message);
    }
  });
});

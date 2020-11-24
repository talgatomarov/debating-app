import React from "react";
import { render } from "@testing-library/react";
import PreparationRoom from "./PreparationRoom";
import { MemoryRouter } from "react-router-dom";
import app from "app";

const mockAuth = jest.spyOn(app, "auth");
describe("PreparationRoom", () => {
  test("Render PreparationRoom", () => {
    const user = {
      uid: "testuid",
      email: "test@test.test",
      displayName: "test",
    } as firebase.User;

    mockAuth.mockImplementationOnce(() => {
      return {
        currentUser: user,
      } as firebase.auth.Auth;
    });

    render(<PreparationRoom roomId="testRoomId" position="og" />, {
      wrapper: MemoryRouter,
    });
  });
});

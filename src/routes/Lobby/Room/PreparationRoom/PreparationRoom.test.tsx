import React from "react";
import { render } from "@testing-library/react";
import PreparationRoom from "./PreparationRoom";
import { Route, Router } from "react-router-dom";
import app from "app";
import { createMemoryHistory } from "history";

const mockAuth = jest.spyOn(app, "auth");
describe("PreparationRoom", () => {
  test("Render PreparationRoom", () => {
    const roomId = "testRoom";
    const position = "og";
    const route = `/${roomId}/prep/${position}`;

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

    const history = createMemoryHistory({ initialEntries: [route] });

    render(
      <Router history={history}>
        <Route
          exact
          path={`/:roomId/prep/:position`}
          component={PreparationRoom}
        />
      </Router>
    );
  });
});

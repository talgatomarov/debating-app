import React from "react";
import { render } from "@testing-library/react";
import LobbyRoutes from "./LobbyRoutes";
import { MemoryRouter, Switch } from "react-router-dom";

describe("LobbyRoutes", () => {
  test("Render /", () => {
    render(
      <MemoryRouter>
        <Switch>
          <LobbyRoutes path="/lobby"> </LobbyRoutes>
        </Switch>
      </MemoryRouter>
    );
  });
});

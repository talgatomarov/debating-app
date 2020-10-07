import React from "react";
import { render } from "@testing-library/react";
import LobbyRoutes from "./LobbyRoutes";
import { MemoryRouter, Switch, Router } from "react-router-dom";
import { createMemoryHistory } from "history";

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

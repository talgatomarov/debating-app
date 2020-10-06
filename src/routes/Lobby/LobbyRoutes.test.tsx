import React from "react";
import { render } from "@testing-library/react";
import LobbyRoutes from "./LobbyRoutes";
import { MemoryRouter, Switch, Router } from "react-router-dom";
import { createMemoryHistory } from "history";

describe("LobbyRoutes", () => {
  test("Render /", () => {
    const history = createMemoryHistory();
    history.push("/lobby");
    render(
      <Router history={history}>
        <Switch>
          <LobbyRoutes path="/lobby"> </LobbyRoutes>
        </Switch>
      </Router>
    );
  });
});

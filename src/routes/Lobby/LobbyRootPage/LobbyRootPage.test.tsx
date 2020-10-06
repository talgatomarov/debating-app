import React from "react";
import { render } from "@testing-library/react";
import LobbyRootPage from "./LobbyRootPage";
import { MemoryRouter } from "react-router-dom";

describe("LobbyRootPage", () => {
  test("Render LobbyRootPage", () => {
    render(<LobbyRootPage />, { wrapper: MemoryRouter });
  });
});

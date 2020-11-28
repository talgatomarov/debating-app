import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import LobbyLayout from "./LobbyLayout";
import { MemoryRouter } from "react-router-dom";

describe("LobbyLayout", () => {
  test("Render LobbyLayout", () => {
    render(<LobbyLayout />, { wrapper: MemoryRouter });

    const menuButton = screen.getByLabelText("open drawer");
    fireEvent.click(menuButton);
  });
});

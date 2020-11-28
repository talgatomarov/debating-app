import { fireEvent, render, screen } from "@testing-library/react";
import app from "app";
import React from "react";
import LobbyAppBar from "./LobbyAppBar";

const mockOnMenuClick = jest.fn();
const mockSignOut = jest.spyOn(app.auth(), "signOut");

describe("LobbyAppBar", () => {
  test("Render LobbyAppBar", () => {
    render(<LobbyAppBar onMenuClick={mockOnMenuClick} />);

    const menuButton = screen.getByLabelText("open drawer");
    fireEvent.click(menuButton);

    expect(mockOnMenuClick).toHaveBeenCalled();
  });

  test("Test signOut", () => {
    render(<LobbyAppBar onMenuClick={mockOnMenuClick} />);

    mockSignOut.mockResolvedValueOnce();
    const signOutButton = screen.getByText(/sign out/i);
    fireEvent.click(signOutButton);

    expect(mockSignOut).toHaveBeenCalled();
  });
});

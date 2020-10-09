import { render } from "@testing-library/react";
import React from "react";
import * as firestoreHook from "react-firebase-hooks/firestore";
import { MemoryRouter } from "react-router-dom";
import LobbyRootPage from "./LobbyRootPage";

const mockUseCollection = jest.spyOn(firestoreHook, "useCollection");

describe("LobbyRootPage", () => {
  test("Render LobbyRootPage", () => {
    render(<LobbyRootPage />, { wrapper: MemoryRouter });
  });
});

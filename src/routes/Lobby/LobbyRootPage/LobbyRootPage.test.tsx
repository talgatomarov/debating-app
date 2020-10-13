import { render, screen } from "@testing-library/react";
import { FirebaseError } from "firebase";
import { Format, Room } from "interfaces/Room";
import React from "react";
import * as firestoreHook from "react-firebase-hooks/firestore";
import { MemoryRouter } from "react-router-dom";
import LobbyRootPage from "./LobbyRootPage";

const mockUseCollectionData = jest.spyOn(firestoreHook, "useCollectionData");

describe("LobbyRootPage", () => {
  test("Render LobbyRootPage", () => {
    render(<LobbyRootPage />, { wrapper: MemoryRouter });
  });

  test("Successful fetch", () => {
    const mockData: Room[] = [
      {
        format: Format.BPF,
        owner: "testuid",
        players: ["testuid"],
        id: "roomId",
        roomName: "testRoom",
        motion: "testMotion",
        publicRoom: true,
      },
    ];

    mockUseCollectionData.mockImplementationOnce((query, options) => {
      return [mockData, false, undefined];
    });

    render(<LobbyRootPage />, { wrapper: MemoryRouter });

    expect(screen.queryByTestId("loading")).not.toBeInTheDocument();
    expect(screen.queryByTestId("error")).not.toBeInTheDocument();
    expect(screen.getByTestId("room-table")).toBeInTheDocument();
  });

  test("Loading fetch", () => {
    mockUseCollectionData.mockImplementationOnce((query, options) => {
      return [undefined, true, undefined];
    });

    render(<LobbyRootPage />, { wrapper: MemoryRouter });

    expect(screen.queryByTestId("error")).not.toBeInTheDocument();
    expect(screen.queryByTestId("room-table")).not.toBeInTheDocument();
    expect(screen.getByTestId("loading")).toBeInTheDocument();
  });

  test("Error fetch", () => {
    const error: FirebaseError = {
      code: "firestore/error",
      message: "Something went wrong",
      name: "FirebaseError",
    };
    mockUseCollectionData.mockImplementationOnce((query, options) => {
      return [undefined, false, error];
    });

    render(<LobbyRootPage />, { wrapper: MemoryRouter });

    expect(screen.getByTestId("error")).toBeInTheDocument();
    expect(screen.queryByTestId("room-table")).not.toBeInTheDocument();
    expect(screen.queryByTestId("loading")).not.toBeInTheDocument();

    expect(screen.getByText(error.message)).toBeInTheDocument();
  });
});

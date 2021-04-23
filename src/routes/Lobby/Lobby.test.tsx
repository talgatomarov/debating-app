import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Lobby from "./Lobby";
import { MemoryRouter } from "react-router-dom";
import { Format, Room, Stage } from "interfaces/Room";
import roomStore from "stores/RoomStore";
import userStore from "stores/UserStore";
import * as hooks from "react-firebase-hooks/firestore";

const mockJoin = jest.fn();
jest.spyOn(roomStore, "join").mockImplementation(mockJoin);
const mockUseCollectionData = jest.fn();
jest
  .spyOn(hooks, "useCollectionData")
  .mockImplementation(mockUseCollectionData);

describe("Lobby", () => {
  test("Render Lobby", () => {
    const rooms: Room[] = [
      {
        name: "test room",
        format: Format.BPF,
        players: ["testuid"],
        stage: Stage.formation,
        privacy: "public",
        id: "testroomid",
      } as Room,
    ];
    mockUseCollectionData.mockReturnValueOnce([rooms, false, null]);

    userStore.roomId = undefined;
    userStore.loading = false;
    roomStore.id = undefined;

    render(<Lobby />, { wrapper: MemoryRouter });

    fireEvent.click(screen.getByTestId(`join-${rooms[0].id}`));
    expect(mockUseCollectionData).toHaveBeenCalled();
  });

  test("loading", () => {
    const rooms: Room[] = [];
    mockUseCollectionData.mockReturnValueOnce([rooms, true, null]);

    userStore.roomId = undefined;
    userStore.loading = false;
    roomStore.id = undefined;

    render(<Lobby />, { wrapper: MemoryRouter });

    expect(screen.getByTestId("loading")).toBeInTheDocument();
    expect(mockUseCollectionData).toHaveBeenCalled();
  });

  test("loading", () => {
    const rooms: Room[] = [];
    const error = { message: "test error" };
    mockUseCollectionData.mockReturnValueOnce([rooms, false, error]);

    userStore.roomId = undefined;
    userStore.loading = false;
    roomStore.id = undefined;

    render(<Lobby />, { wrapper: MemoryRouter });

    expect(screen.getByText(error.message)).toBeInTheDocument();
    expect(mockUseCollectionData).toHaveBeenCalled();
  });

  test("User store loading", () => {
    const rooms: Room[] = [];
    const error = { message: "test error" };
    mockUseCollectionData.mockReturnValueOnce([rooms, false, error]);

    userStore.roomId = undefined;
    userStore.loading = true;
    roomStore.id = undefined;

    render(<Lobby />, { wrapper: MemoryRouter });

    expect(screen.getByTestId("loading")).toBeInTheDocument();
  });
});

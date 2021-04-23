import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import RoomTable from "./RoomTable";
import { MemoryRouter } from "react-router-dom";
import { Format, Room, Stage } from "interfaces/Room";
import roomStore from "stores/RoomStore";

const mockJoin = jest.fn();
jest.spyOn(roomStore, "join").mockImplementation(mockJoin);

test("Render SignIn", () => {
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

  render(<RoomTable rooms={rooms} />, { wrapper: MemoryRouter });

  fireEvent.click(screen.getByTestId(`join-${rooms[0].id}`));
  expect(mockJoin).toHaveBeenCalled();
});

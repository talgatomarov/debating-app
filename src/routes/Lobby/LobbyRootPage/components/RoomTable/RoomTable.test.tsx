import React from "react";
import { customRender } from "utils/testing";
import RoomTable from "./RoomTable";
import { createMemoryHistory } from "history";
import { Format, Room } from "interfaces/Room";
import { fireEvent, screen } from "@testing-library/react";

describe("RoomTable", () => {
  test("Render RoomTable", () => {
    const rooms: Room[] = [
      {
        id: "roomid",
        roomName: "testroom",
        format: Format.BPF,
        publicRoom: true,
        motion: "testmotion",
        infoslide: null,
        owner: "testuseruid",
        judge: {
          id: null,
          name: null,
        },
        participantsCount: 0,
        players: [
          {
            id: null,
            name: null,
          },
          {
            id: null,
            name: null,
          },
          {
            id: null,
            name: null,
          },
          {
            id: null,
            name: null,
          },
          {
            id: null,
            name: null,
          },
          {
            id: null,
            name: null,
          },
          {
            id: null,
            name: null,
          },
          {
            id: null,
            name: null,
          },
        ],
      },
    ];
    const history = createMemoryHistory({ initialEntries: ["/lobby"] });

    customRender(<RoomTable rooms={rooms} />, { history: history });

    expect(screen.getByText(rooms[0].roomName)).toBeInTheDocument();
    expect(screen.getByText(rooms[0].format)).toBeInTheDocument();
    expect(
      screen.getByText(`${rooms[0].participantsCount}`)
    ).toBeInTheDocument();
    const joinButton = screen.getByTestId(`join-${rooms[0].id}`);
    fireEvent.click(joinButton);

    expect(history.location.pathname).toBe(
      `/lobby/${rooms[0].id}/waiting-room`
    );
  });
});

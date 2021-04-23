import React from "react";
import { render, screen } from "@testing-library/react";
import Formation from "./Formation";
import { MemoryRouter } from "react-router-dom";
import userStore from "stores/UserStore";
import firebase from "firebase";
import roomStore from "stores/RoomStore";
import { createPositions } from "stores/RoomStore/Positions";
import { Format } from "interfaces/Room";

describe("Formation", () => {
  test("BPF", async () => {
    userStore.currentUser = { uid: "testuid" } as firebase.User;
    userStore.meetingName = "testmeetingname";
    userStore.meetingToken = "testmeetingtoken";

    const positions = createPositions(Format.BPF);

    roomStore.judges = [];
    roomStore.positions = positions;
    roomStore.owner = "testuid";
    roomStore.format = Format.BPF;

    render(<Formation />, { wrapper: MemoryRouter });
    expect(screen.queryByText(/unknown room format/i)).not.toBeInTheDocument();
  });

  test("APF", async () => {
    userStore.currentUser = { uid: "testuid" } as firebase.User;
    userStore.meetingName = "testmeetingname";
    userStore.meetingToken = "testmeetingtoken";

    const positions = createPositions(Format.APF);

    roomStore.judges = [];
    roomStore.positions = positions;
    roomStore.owner = "testuid";
    roomStore.format = Format.APF;

    render(<Formation />, { wrapper: MemoryRouter });
    expect(screen.queryByText(/unknown room format/i)).not.toBeInTheDocument();
  });

  test("Unknown", async () => {
    userStore.currentUser = { uid: "testuid" } as firebase.User;
    userStore.meetingName = "testmeetingname";
    userStore.meetingToken = "testmeetingtoken";

    const positions = createPositions(Format.APF);

    roomStore.judges = [];
    roomStore.positions = positions;
    roomStore.owner = "testuid";
    roomStore.format = Format.UNKNOWN;

    render(<Formation />, { wrapper: MemoryRouter });
    expect(screen.getByText(/unknown room format/i)).toBeInTheDocument();
  });
});

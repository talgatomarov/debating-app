import React from "react";
import { render, screen } from "@testing-library/react";
import Room from "./Room";
import { MemoryRouter } from "react-router-dom";
import userStore from "stores/UserStore";
import firebase from "firebase";
import roomStore from "stores/RoomStore";
import { createPositions } from "stores/RoomStore/Positions";
import { Format, Stage } from "interfaces/Room";

describe("Room", () => {
  test("Formation", async () => {
    userStore.currentUser = { uid: "testuid" } as firebase.User;
    userStore.meetingName = "testmeetingname";
    userStore.meetingToken = "testmeetingtoken";

    const positions = createPositions(Format.BPF);

    roomStore.judges = [];
    roomStore.positions = positions;
    roomStore.owner = "testuid";
    roomStore.format = Format.BPF;
    roomStore.stage = Stage.formation;
    roomStore.loading = false;
    userStore.roomId = "testroomid";

    render(<Room />, { wrapper: MemoryRouter });
    expect(screen.queryByText(/unknown room stage/i)).not.toBeInTheDocument();
    expect(screen.getByText(/players/i)).toBeInTheDocument();
  });

  test("Preparation", async () => {
    userStore.currentUser = { uid: "testuid" } as firebase.User;
    userStore.meetingName = "testmeetingname";
    userStore.meetingToken = "testmeetingtoken";

    const positions = createPositions(Format.BPF);

    roomStore.judges = [];
    roomStore.positions = positions;
    roomStore.owner = "testuid";
    roomStore.format = Format.BPF;
    roomStore.stage = Stage.preparation;
    roomStore.loading = false;
    userStore.roomId = "testroomid";

    render(<Room />, { wrapper: MemoryRouter });
    expect(screen.queryByText(/unknown room stage/i)).not.toBeInTheDocument();
    expect(screen.getByText(/preparation/i)).toBeInTheDocument();
  });

  test("Ongoing", async () => {
    userStore.currentUser = { uid: "testuid" } as firebase.User;
    userStore.meetingName = "testmeetingname";
    userStore.meetingToken = "testmeetingtoken";

    const positions = createPositions(Format.BPF);

    roomStore.judges = [];
    roomStore.positions = positions;
    roomStore.owner = "testuid";
    roomStore.format = Format.BPF;
    roomStore.stage = Stage.ongoing;
    roomStore.loading = false;
    userStore.roomId = "testroomid";

    render(<Room />, { wrapper: MemoryRouter });
    expect(screen.queryByText(/unknown room stage/i)).not.toBeInTheDocument();
    expect(screen.getByText(/ongoing/i)).toBeInTheDocument();
  });

  test("Deliberation", async () => {
    userStore.currentUser = { uid: "testuid" } as firebase.User;
    userStore.meetingName = "testmeetingname";
    userStore.meetingToken = "testmeetingtoken";

    const positions = createPositions(Format.BPF);

    roomStore.judges = [];
    roomStore.positions = positions;
    roomStore.owner = "testuid";
    roomStore.format = Format.BPF;
    roomStore.stage = Stage.deliberation;
    roomStore.loading = false;
    userStore.roomId = "testroomid";

    render(<Room />, { wrapper: MemoryRouter });
    expect(screen.queryByText(/unknown room stage/i)).not.toBeInTheDocument();
    expect(screen.getByText(/deliberation/i)).toBeInTheDocument();
  });

  test("Adjudication", async () => {
    userStore.currentUser = { uid: "testuid" } as firebase.User;
    userStore.meetingName = "testmeetingname";
    userStore.meetingToken = "testmeetingtoken";

    const positions = createPositions(Format.BPF);

    roomStore.judges = [];
    roomStore.positions = positions;
    roomStore.owner = "testuid";
    roomStore.format = Format.BPF;
    roomStore.stage = Stage.adjudication;
    roomStore.loading = false;
    userStore.roomId = "testroomid";

    render(<Room />, { wrapper: MemoryRouter });
    expect(screen.queryByText(/unknown room stage/i)).not.toBeInTheDocument();
    expect(screen.getByText(/adjudication/i)).toBeInTheDocument();
  });

  test("Unknown", async () => {
    userStore.currentUser = { uid: "testuid" } as firebase.User;
    userStore.meetingName = "testmeetingname";
    userStore.meetingToken = "testmeetingtoken";

    const positions = createPositions(Format.BPF);

    roomStore.judges = [];
    roomStore.positions = positions;
    roomStore.owner = "testuid";
    roomStore.format = Format.BPF;
    roomStore.stage = "unknown" as Stage;
    roomStore.loading = false;
    userStore.roomId = "testroomid";

    render(<Room />, { wrapper: MemoryRouter });
    expect(screen.getByText(/unknown room stage/i)).toBeInTheDocument();
  });

  test("Loading", async () => {
    userStore.currentUser = { uid: "testuid" } as firebase.User;
    userStore.meetingName = "testmeetingname";
    userStore.meetingToken = "testmeetingtoken";

    roomStore.loading = true;

    render(<Room />, { wrapper: MemoryRouter });
    expect(screen.getByTestId("loading")).toBeInTheDocument();
  });

  test("Error", async () => {
    userStore.currentUser = { uid: "testuid" } as firebase.User;
    userStore.meetingName = "testmeetingname";
    userStore.meetingToken = "testmeetingtoken";

    const error = { message: "test error" };
    roomStore.loading = false;
    roomStore.error = error as Error;

    render(<Room />, { wrapper: MemoryRouter });
    expect(screen.getByText(error.message)).toBeInTheDocument();
  });
});

import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Adjudication from "./Adjudication";
import { MemoryRouter } from "react-router-dom";
import userStore from "stores/UserStore";
import firebase from "firebase";
import roomStore from "stores/RoomStore";
import { Judge } from "interfaces/Judge";

const mockEndRound = jest.fn();
jest.spyOn(roomStore, "endRound").mockImplementation(mockEndRound);

describe("Deliberation", () => {
  test("Speaker view", () => {
    userStore.currentUser = { uid: "testuid" } as firebase.User;
    userStore.meetingName = "testmeetingname";
    userStore.meetingToken = "testmeetingtoken";

    render(<Adjudication />, { wrapper: MemoryRouter });

    expect(screen.getByTestId("daily-frame")).toBeInTheDocument();
    expect(screen.queryByText(/end round/i)).not.toBeInTheDocument();
  });

  test("Judge view", () => {
    userStore.currentUser = { uid: "testuid" } as firebase.User;
    userStore.meetingName = "testmeetingname";
    userStore.meetingToken = "testmeetingtoken";

    const judge: Judge = {
      uid: "testuid",
      name: "testname",
    };
    roomStore.judges = [judge];

    render(<Adjudication />, { wrapper: MemoryRouter });

    expect(screen.getByTestId("daily-frame")).toBeInTheDocument();
    expect(screen.getByText(/end round/i)).toBeInTheDocument();

    fireEvent.click(screen.getByText(/end round/i));
    expect(mockEndRound).toHaveBeenCalled();
  });
});

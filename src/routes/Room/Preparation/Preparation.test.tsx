import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Preparation from "./Preparation";
import { MemoryRouter } from "react-router-dom";
import userStore from "stores/UserStore";
import roomStore from "stores/RoomStore";
import firebase from "firebase";
import { Judge } from "interfaces/Judge";

const mockStartRound = jest.fn();
jest.spyOn(roomStore, "startRound").mockImplementation(mockStartRound);

describe("Preparation", () => {
  test("Speaker preparation", () => {
    userStore.currentUser = { uid: "testuid" } as firebase.User;
    userStore.meetingName = "testmeetingname";
    userStore.meetingToken = "testmeetingtoken";

    render(<Preparation />, { wrapper: MemoryRouter });

    expect(screen.getByTestId("daily-frame")).toBeInTheDocument();
    expect(screen.queryByText(/start round/i)).not.toBeInTheDocument();
  });

  test("Judge preparation", () => {
    userStore.currentUser = { uid: "testuid" } as firebase.User;
    userStore.meetingName = "testmeetingname";
    userStore.meetingToken = "testmeetingtoken";

    const judge: Judge = {
      uid: "testuid",
      name: "testname",
    };
    roomStore.judges = [judge];

    render(<Preparation />, { wrapper: MemoryRouter });

    expect(screen.getByTestId("daily-frame")).toBeInTheDocument();
    expect(screen.getByText(/start round/i)).toBeInTheDocument();
    fireEvent.click(screen.getByText(/start round/i));

    expect(mockStartRound).toHaveBeenCalled();
  });
});

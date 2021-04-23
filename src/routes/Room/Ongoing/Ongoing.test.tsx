import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Ongoing from "./Ongoing";
import { MemoryRouter } from "react-router-dom";
import userStore from "stores/UserStore";
import roomStore from "stores/RoomStore";
import firebase from "firebase";
import { Judge } from "interfaces/Judge";

const mockStartDelibertion = jest.fn();
jest
  .spyOn(roomStore, "startDeliberation")
  .mockImplementation(mockStartDelibertion);

describe("Ongoing", () => {
  test("Speaker view", () => {
    render(<Ongoing />, { wrapper: MemoryRouter });

    userStore.currentUser = { uid: "testuid" } as firebase.User;
    userStore.meetingName = "testmeetingname";
    userStore.meetingToken = "testmeetingtoken";

    expect(screen.getByTestId("daily-frame")).toBeInTheDocument();
    expect(screen.queryByText(/start judging/i)).not.toBeInTheDocument();
  });

  test("Judge view", () => {
    render(<Ongoing />, { wrapper: MemoryRouter });

    userStore.currentUser = { uid: "testuid" } as firebase.User;
    userStore.meetingName = "testmeetingname";
    userStore.meetingToken = "testmeetingtoken";

    expect(screen.getByTestId("daily-frame")).toBeInTheDocument();
    const judge: Judge = {
      uid: "testuid",
      name: "testname",
    };
    roomStore.judges = [judge];

    expect(screen.getByTestId("daily-frame")).toBeInTheDocument();
    expect(screen.getByText(/start judging/i)).toBeInTheDocument();

    fireEvent.click(screen.getByText(/start judging/i));

    expect(mockStartDelibertion).toHaveBeenCalled();
  });
});

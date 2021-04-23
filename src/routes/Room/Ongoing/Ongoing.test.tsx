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
    userStore.currentUser = { uid: "testuid" } as firebase.User;
    userStore.meetingName = "testmeetingname";
    userStore.meetingToken = "testmeetingtoken";

    render(<Ongoing />, { wrapper: MemoryRouter });

    expect(screen.getByTestId("daily-frame")).toBeInTheDocument();
    expect(screen.queryByText(/start judging/i)).not.toBeInTheDocument();
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

    render(<Ongoing />, { wrapper: MemoryRouter });

    expect(screen.getByTestId("daily-frame")).toBeInTheDocument();
    expect(screen.getByTestId("daily-frame")).toBeInTheDocument();
    expect(screen.getByText(/start judging/i)).toBeInTheDocument();

    fireEvent.click(screen.getByText(/start judging/i));

    expect(mockStartDelibertion).toHaveBeenCalled();
  });
});

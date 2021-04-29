import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Deliberation from "./Deliberation";
import { MemoryRouter } from "react-router-dom";
import userStore from "stores/UserStore";
import firebase from "firebase";
import roomStore from "stores/RoomStore";
import { Judge } from "interfaces/Judge";

const mockStartAdjudication = jest.fn();
jest
  .spyOn(roomStore, "startAdjudication")
  .mockImplementation(mockStartAdjudication);

describe("Deliberation", () => {
  test("Speaker view", () => {
    userStore.currentUser = { uid: "testuid" } as firebase.User;
    userStore.meetingName = "testmeetingname";
    userStore.meetingToken = "testmeetingtoken";

    render(<Deliberation />, { wrapper: MemoryRouter });

    expect(screen.getByTestId("daily-frame")).toBeInTheDocument();
    expect(screen.queryByText(/start adjudication/i)).not.toBeInTheDocument();
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

    render(<Deliberation />, { wrapper: MemoryRouter });

    expect(screen.getByTestId("daily-frame")).toBeInTheDocument();
    expect(screen.getByText(/start adjudication/i)).toBeInTheDocument();

    fireEvent.click(screen.getByText(/start adjudication/i));
    expect(mockStartAdjudication).toHaveBeenCalled();
  });
});

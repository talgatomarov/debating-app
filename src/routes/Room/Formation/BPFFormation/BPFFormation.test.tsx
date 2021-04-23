import React from "react";
import {
  fireEvent,
  render,
  screen,
  waitForElement,
} from "@testing-library/react";
import BPFFormation from "./BPFFormation";
import { MemoryRouter } from "react-router-dom";
import userStore from "stores/UserStore";
import firebase from "firebase";
import roomStore from "stores/RoomStore";
import { Judge } from "interfaces/Judge";
import { createPositions } from "stores/RoomStore/Positions";
import { Format } from "interfaces/Room";

const mockSelectPosition = jest.fn();
const mockAdjudicate = jest.fn();
const mockStartPreparation = jest.fn();

jest.spyOn(roomStore, "selectPosition").mockImplementation(mockSelectPosition);
jest.spyOn(roomStore, "adjudicate").mockImplementation(mockAdjudicate);
jest
  .spyOn(roomStore, "startPreparation")
  .mockImplementation(mockStartPreparation);

describe("BPFFormation", () => {
  test("Render BPFFormation", async () => {
    userStore.currentUser = { uid: "testuid" } as firebase.User;
    userStore.meetingName = "testmeetingname";
    userStore.meetingToken = "testmeetingtoken";

    const judge: Judge = {
      uid: "testuid",
      name: "testname",
    };
    const positions = createPositions(Format.BPF);
    positions["Opening Government"]["Prime Minister"] = {
      uid: "primeministeruid",
      name: "prime",
    };

    roomStore.judges = [];
    roomStore.positions = positions;
    roomStore.owner = "testuid";

    render(<BPFFormation />, { wrapper: MemoryRouter });

    expect(screen.getByText(/no judges/i)).toBeInTheDocument();

    expect(
      screen.queryByTestId("select Prime Minister")
    ).not.toBeInTheDocument();

    fireEvent.click(screen.getByTestId("select Deputy Prime Minister"));
    expect(mockSelectPosition).toHaveBeenCalled();

    fireEvent.click(screen.getByText(/adjudicate/i));
    expect(mockAdjudicate).toHaveBeenCalled();

    fireEvent.click(screen.getByText(/start preparation/i));
    expect(mockStartPreparation).toHaveBeenCalled();

    roomStore.judges = [judge];
    expect(await waitForElement(() => screen.getByText(judge.name!)));
  });
});

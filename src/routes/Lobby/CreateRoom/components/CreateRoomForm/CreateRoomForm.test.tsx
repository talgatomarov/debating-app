import React from "react";
import { fireEvent, render, screen, within } from "@testing-library/react";
import CreateRoomForm from "./CreateRoomForm";
import app from "app";
import firebase from "firebase";
import { Format } from "interfaces/Room";
import { when } from "jest-when";

const mockCollection = jest.spyOn(app.firestore(), "collection");
const mockAuth = jest.spyOn(app, "auth");
const mockAddRoom = jest.fn();

afterEach(() => {
  jest.resetAllMocks();
});

describe("CreateRoomForm", () => {
  test("Render CreateRoomForm", () => {
    render(<CreateRoomForm />);
  });

  test("Success", () => {
    const roomName = "testRoom";
    const format = "British Parliamentary";
    const motion = "THBT";
    const infoslide = "INFO";

    const user = {
      uid: "testuid",
      email: "test@test.test",
      displayName: "test",
    } as firebase.User;

    const ref = {
      id: "testdataid",
    } as firebase.firestore.DocumentReference;

    mockAuth.mockImplementationOnce(() => {
      return {
        currentUser: user,
      } as firebase.auth.Auth;
    });

    when(mockCollection)
      .calledWith("rooms")
      .mockImplementationOnce((collectionPath) => {
        return ({
          add: mockAddRoom.mockReturnValue(ref),
        } as unknown) as firebase.firestore.CollectionReference<
          firebase.firestore.DocumentData
        >;
      });

    render(<CreateRoomForm />);
    fireEvent.change(screen.getByLabelText(/room name/i), {
      target: { value: roomName },
    });

    fireEvent.mouseDown(screen.getByLabelText(/format/i));
    const listbox = within(screen.getByRole("listbox"));
    fireEvent.click(listbox.getByText(format));

    fireEvent.change(screen.getByLabelText(/room name/i), {
      target: { value: roomName },
    });

    fireEvent.change(screen.getByLabelText(/motion/i), {
      target: { value: motion },
    });

    fireEvent.change(screen.getByLabelText(/infoslide/i), {
      target: { value: infoslide },
    });

    fireEvent.click(screen.getByLabelText(/make public/i));

    fireEvent.submit(screen.getByText(/create/i));

    expect(mockAddRoom).toBeCalledTimes(1);

    const data = {
      roomName: roomName,
      format: Format.BPF,
      publicRoom: true,
      motion: motion,
      infoslide: infoslide,
      owner: user.uid,
      players: [user.uid],
    };

    expect(mockAddRoom).toBeCalledWith(data);
  });
});

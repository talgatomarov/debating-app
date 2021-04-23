import React from "react";
import { render, act, screen, fireEvent, within } from "@testing-library/react";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import CreateRoomForm from "./CreateRoomForm";
import { Format } from "interfaces/Room";
import roomStore from "stores/RoomStore";

const mockCreateRoom = jest.fn();
jest.spyOn(roomStore, "create").mockImplementation(mockCreateRoom);

describe("CreateRoomForm", () => {
  test("Successful submit", async () => {
    const history = createMemoryHistory();

    const roomInfo = {
      name: "Test room info",
      format: Format.BPF,
      privacy: "public",
      motion: "Test motion",
      infoslide: "Test infoslide",
    };
    render(
      <Router history={history}>
        <CreateRoomForm />
      </Router>
    );

    // Set room name
    fireEvent.change(screen.getByLabelText(/room name/i), {
      target: { value: roomInfo.name },
    });

    // Set format
    fireEvent.mouseDown(screen.getByLabelText(/format/i));
    const formatOptions = screen.getAllByRole("option");
    fireEvent.click(formatOptions[1]);
    fireEvent.click(formatOptions[0]);

    // Set privacy
    fireEvent.mouseDown(screen.getByLabelText(/privacy/i));
    const privacyOptions = screen.getAllByRole("option");
    fireEvent.click(privacyOptions[1]);
    fireEvent.click(privacyOptions[0]);

    // Set motion
    fireEvent.change(screen.getByLabelText(/motion/i), {
      target: { value: roomInfo.motion },
    });

    // Set infoslide
    fireEvent.change(screen.getByLabelText(/infoslide/i), {
      target: { value: roomInfo.infoslide },
    });

    // Submit form
    await act(async () => {
      fireEvent.submit(screen.getByText(/create/i));
    });

    expect(mockCreateRoom).toHaveBeenCalledWith(roomInfo);
    expect(history.location.pathname).toBe("/room");
  });

  test("Failed submit", async () => {
    const history = createMemoryHistory();
    const error = { message: "test error" };
    mockCreateRoom.mockRejectedValueOnce(error);

    const roomInfo = {
      name: "Test room info",
      privacy: "public",
      format: Format.BPF,
      motion: "Test motion",
      infoslide: "Test infoslide",
    };

    render(
      <Router history={history}>
        <CreateRoomForm />
      </Router>
    );

    // Set room name
    fireEvent.change(screen.getByLabelText(/room name/i), {
      target: { value: roomInfo.name },
    });

    // Set format
    fireEvent.mouseDown(screen.getByLabelText(/format/i));
    const formatListbox = within(screen.getByRole("listbox"));
    fireEvent.click(formatListbox.getByText(roomInfo.format));

    // Set privacy
    fireEvent.mouseDown(screen.getByLabelText(/privacy/i));
    const privacyListbox = within(screen.getByRole("listbox"));
    fireEvent.click(privacyListbox.getByText(roomInfo.privacy));

    // Set motion
    fireEvent.change(screen.getByLabelText(/motion/i), {
      target: { value: roomInfo.motion },
    });

    // Set infoslide
    fireEvent.change(screen.getByLabelText(/infoslide/i), {
      target: { value: roomInfo.infoslide },
    });

    // Submit form
    await act(async () => {
      fireEvent.submit(screen.getByText(/create/i));
    });

    expect(mockCreateRoom).toHaveBeenCalled();
    expect(history.location.pathname).toBe("/");

    expect(screen.getByText(error.message)).toBeInTheDocument();
  });
});

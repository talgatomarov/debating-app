import React from "react";
import { render } from "@testing-library/react";
import CreateRoomForm from "./CreateRoomForm";

describe("CreateRoomForm", () => {
  test("Render CreateRoomForm", () => {
    render(<CreateRoomForm />);
  });
});

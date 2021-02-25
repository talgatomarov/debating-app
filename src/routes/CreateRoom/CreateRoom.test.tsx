import React from "react";
import { render } from "@testing-library/react";
import CreateRoom from "./CreateRoom";
import { MemoryRouter } from "react-router-dom";

describe("CreateRoom", () => {
  test("Render CreateRoom", () => {
    render(<CreateRoom />, { wrapper: MemoryRouter });
  });
});

import React from "react";
import { render } from "@testing-library/react";
import SignIn from "./SignIn";
import { MemoryRouter } from "react-router-dom";

test("Render SignIn", () => {
  render(<SignIn />, { wrapper: MemoryRouter });
});

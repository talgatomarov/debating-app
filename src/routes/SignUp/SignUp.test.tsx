import * as React from "react";
import { render } from "@testing-library/react";
import SignUp from "./SignUp";
import { MemoryRouter } from "react-router-dom";

test("Render SignUp", () => {
  render(<SignUp />, { wrapper: MemoryRouter });
});

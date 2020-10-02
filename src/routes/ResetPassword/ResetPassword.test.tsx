import React from "react";
import { render } from "@testing-library/react";
import ResetPassword from "./ResetPassword";
import { MemoryRouter } from "react-router-dom";

test("Render ResetPassword", () => {
  render(<ResetPassword />, { wrapper: MemoryRouter });
});

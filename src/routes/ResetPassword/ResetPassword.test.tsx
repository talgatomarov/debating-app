import * as React from "react";
import { render } from "@testing-library/react";
import ResetPassword from "./ResetPassword";
import { MemoryRouter } from "react-router-dom";

test("Render SignUp", () => {
  render(<ResetPassword />, { wrapper: MemoryRouter });
});

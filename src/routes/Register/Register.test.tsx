import * as React from "react";
import { render } from "@testing-library/react";
import Register from "./Register";

describe("Register", () => {
  test("Test render", () => {
    render(<Register />);
  });
});

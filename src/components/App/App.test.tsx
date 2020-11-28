import React from "react";
import { render, act } from "@testing-library/react";
import App from "./App";

const flushPromises = () => new Promise(setImmediate);

test("renders learn react link", async () => {
  render(<App />);
  await act(() => flushPromises());
});

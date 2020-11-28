/* istanbul ignore file */
import { render, RenderOptions, RenderResult } from "@testing-library/react";
import React from "react";
import { Router } from "react-router-dom";
import { createMemoryHistory, MemoryHistory } from "history";

export interface CustomRenderOptions extends RenderOptions {
  history: MemoryHistory;
}

export const customRender = (
  ui: React.ReactElement,
  { history = createMemoryHistory(), ...renderOptions }: CustomRenderOptions
): RenderResult => {
  const Wrapper: React.FC = ({ children }) => {
    return <Router history={history}>{children}</Router>;
  };

  return render(ui, { wrapper: Wrapper, ...renderOptions });
};

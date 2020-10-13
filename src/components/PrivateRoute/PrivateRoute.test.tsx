import { render, screen, waitForElement } from "@testing-library/react";
import { createMemoryHistory, MemoryHistory } from "history";
import React from "react";
import * as authHook from "react-firebase-hooks/auth";
import { Route, Router, Switch } from "react-router-dom";
import PrivateRoute from "./PrivateRoute";

const Home: React.FC = () => <h1>Home</h1>;
const PrivateComponent: React.FC = () => <h1>Private</h1>;

interface TestAppProps {
  history: MemoryHistory;
}

const TestApp: React.FC<TestAppProps> = ({ history }) => {
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/" component={Home} />
        <PrivateRoute
          path="/private"
          component={PrivateComponent}
          redirect="/"
        />
      </Switch>
    </Router>
  );
};

describe("PrivateRoute", () => {
  test("Failed access", async () => {
    const history = createMemoryHistory();
    history.push("/");

    render(<TestApp history={history} />);
    expect(history.location.pathname).toBe("/");

    history.push("/private");
    expect(history.location.pathname).toBe("/private");
    await waitForElement(() => screen.getByText("Home"));
  });

  test("Successful access", async () => {
    const mockUser = {
      uid: "testuid",
      email: "testemail",
    } as firebase.User;

    const mockUseAuthState = jest.spyOn(authHook, "useAuthState");
    mockUseAuthState.mockImplementationOnce(() => [mockUser, false, undefined]);

    const history = createMemoryHistory();
    history.push("/");

    render(<TestApp history={history} />);
    expect(history.location.pathname).toBe("/");

    history.push("/private");
    expect(history.location.pathname).toBe("/private");
    await waitForElement(() => screen.getByText("Private"));
  });
});

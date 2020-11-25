import { cleanup, render, screen } from "@testing-library/react";
import { FirebaseError } from "firebase";
import { Format, Room } from "interfaces/Room";
import React from "react";
import * as firestoreHook from "react-firebase-hooks/firestore";
import { Route, Router } from "react-router-dom";
import LobbyRootPage from "./LobbyRootPage";
import { createMemoryHistory } from "history";

afterEach(() => {
  cleanup();
});

const mockUseCollectionData = jest.spyOn(firestoreHook, "useCollectionData");
const route = "/lobby";

describe("LobbyRootPage", () => {
  test("Render LobbyRootPage", () => {
    const history = createMemoryHistory({ initialEntries: [route] });

    render(
      <Router history={history}>
        <Route exact path={route} component={LobbyRootPage} />
      </Router>
    );
  });

  test("Successful fetch", () => {
    const mockData: Room[] = [
      {
        id: "test",
        roomName: "testroomname",
        format: Format.BPF,
        publicRoom: true,
        motion: "testmotion",
        infoslide: "testinfoslide",
        owner: "testuseruid",
        judge: {
          id: null,
          name: null,
        },
        participantsCount: 0,
        players: [
          {
            id: null,
            name: null,
          },
          {
            id: null,
            name: null,
          },
          {
            id: null,
            name: null,
          },
          {
            id: null,
            name: null,
          },
          {
            id: null,
            name: null,
          },
          {
            id: null,
            name: null,
          },
          {
            id: null,
            name: null,
          },
          {
            id: null,
            name: null,
          },
        ],
      },
    ];

    mockUseCollectionData.mockImplementationOnce((query, options) => {
      return [mockData, false, undefined];
    });

    const history = createMemoryHistory({ initialEntries: [route] });

    render(
      <Router history={history}>
        <Route exact path={route} component={LobbyRootPage} />
      </Router>
    );

    // render(<LobbyRootPage />, { wrapper: MemoryRouter });

    expect(screen.queryByTestId("loading")).not.toBeInTheDocument();
    expect(screen.queryByTestId("error")).not.toBeInTheDocument();
    expect(screen.getByTestId("room-table")).toBeInTheDocument();
  });

  test("Loading fetch", () => {
    mockUseCollectionData.mockImplementationOnce((query, options) => {
      return [undefined, true, undefined];
    });

    const history = createMemoryHistory({ initialEntries: [route] });

    render(
      <Router history={history}>
        <Route exact path={route} component={LobbyRootPage} />
      </Router>
    );

    expect(screen.queryByTestId("error")).not.toBeInTheDocument();
    expect(screen.queryByTestId("room-table")).not.toBeInTheDocument();
    expect(screen.getByTestId("loading")).toBeInTheDocument();
  });

  test("Error fetch", () => {
    const error: FirebaseError = {
      code: "firestore/error",
      message: "Something went wrong",
      name: "FirebaseError",
    };
    mockUseCollectionData.mockImplementationOnce((query, options) => {
      return [undefined, false, error];
    });

    const history = createMemoryHistory({ initialEntries: [route] });

    render(
      <Router history={history}>
        <Route exact path={route} component={LobbyRootPage} />
      </Router>
    );

    expect(screen.getByTestId("error")).toBeInTheDocument();
    expect(screen.queryByTestId("room-table")).not.toBeInTheDocument();
    expect(screen.queryByTestId("loading")).not.toBeInTheDocument();

    expect(screen.getByText(error.message)).toBeInTheDocument();
  });
});

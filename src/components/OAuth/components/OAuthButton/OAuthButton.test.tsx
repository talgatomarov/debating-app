import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import OAuthButton from "./OAuthButton";
import { MemoryRouter } from "react-router-dom";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";
import firebase from "firebase";

const mockSignInMethod = jest.spyOn(firebase.auth(), "signInWithPopup");
const mockFetchSignInMethodsForEmail = jest.spyOn(
  firebase.auth(),
  "fetchSignInMethodsForEmail"
);

const flushPromises = () => new Promise(setImmediate);

afterAll(() => {
  jest.clearAllMocks();
});

describe("OAuthButton", () => {
  test("Valid signin with OAuthButton", () => {
    const mockUserCrendetial = {
      user: {
        uid: "testuid",
        email: "test@test.test",
        emailVerified: false,
        displayName: "Test User",
        photoURL: null,
      },
    } as firebase.auth.UserCredential;

    mockSignInMethod.mockResolvedValueOnce(mockUserCrendetial);

    render(
      <OAuthButton
        backgroundColor="red"
        icon={faGoogle}
        provider={new firebase.auth.GoogleAuthProvider()}
      >
        Sign in with Test
      </OAuthButton>,
      { wrapper: MemoryRouter }
    );

    fireEvent.click(screen.getByRole("button"));

    expect(mockSignInMethod).toHaveBeenCalled();
    expect(screen.getByText("Sign in with Test")).toBeInTheDocument();
  });

  test("Invalid signin with OAuthButton", () => {
    const authError = {
      code: "auth/error",
      message: "Something went wrong",
    };

    mockSignInMethod.mockRejectedValueOnce(authError);

    render(
      <OAuthButton
        backgroundColor="red"
        icon={faGoogle}
        provider={new firebase.auth.GoogleAuthProvider()}
      >
        Sign in with Test
      </OAuthButton>,
      { wrapper: MemoryRouter }
    );

    fireEvent.click(screen.getByRole("button"));

    expect(mockSignInMethod).toHaveBeenCalled();
    expect(screen.getByText("Sign in with Test")).toBeInTheDocument();
  });

  test("Account exists with different credential", async () => {
    const authError = {
      code: "auth/account-exists-with-different-credential",
      email: "test@test.test",
      credential: "credential",
    };
    const initialUserCredential = {
      user: {
        uid: "testuid",
      },
    } as firebase.auth.UserCredential;

    const googleUserCredential = {
      user: {
        uid: "testuid",
        linkWithCredential: (credential) =>
          new Promise((resolve) => initialUserCredential),
      },
      credential: null,
    } as firebase.auth.UserCredential;

    mockSignInMethod.mockRejectedValueOnce(authError);
    mockSignInMethod.mockResolvedValueOnce(googleUserCredential);
    mockFetchSignInMethodsForEmail.mockResolvedValueOnce(["google.com"]);

    render(
      <OAuthButton
        backgroundColor="red"
        icon={faGoogle}
        provider={new firebase.auth.GoogleAuthProvider()}
      >
        Sign in with Test
      </OAuthButton>,
      { wrapper: MemoryRouter }
    );

    fireEvent.click(screen.getByRole("button"));

    await flushPromises();
    expect(mockSignInMethod).toHaveBeenCalled();
    expect(mockFetchSignInMethodsForEmail).toHaveBeenCalled();
    expect(screen.getByText("Sign in with Test")).toBeInTheDocument();
  });
});

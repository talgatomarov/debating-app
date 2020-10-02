import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitForElement,
} from "@testing-library/react";
import SignInForm from "./SignInForm";
import firebase from "firebase";
import { MemoryRouter } from "react-router-dom";

afterEach(() => {
  jest.clearAllMocks();
});

const mockSignInMethod = jest.spyOn(
  firebase.auth(),
  "signInWithEmailAndPassword"
);

describe("Sign In", () => {
  test("Test render", () => {
    render(<SignInForm />, { wrapper: MemoryRouter });
  });

  test("Valid sign in", async () => {
    const email = "test@test.test";
    const password = "123456!";

    const mockUserCrendetial = {
      user: {
        uid: "testuid",
        email: email,
        emailVerified: false,
        displayName: "Test User",
        photoURL: null,
      },
    } as firebase.auth.UserCredential;

    mockSignInMethod.mockResolvedValueOnce(mockUserCrendetial);

    render(<SignInForm />, { wrapper: MemoryRouter });

    (screen.getByLabelText(/email/i) as HTMLInputElement).value = email;
    (screen.getByLabelText(/password/i) as HTMLInputElement).value = password;
    fireEvent.click(screen.getByRole("button"));

    expect(mockSignInMethod).toHaveBeenCalledTimes(1);
    expect(mockSignInMethod).toHaveBeenCalledWith(email, password);
  });

  test("Invalid Sign In", async () => {
    const email = "test@test.test";
    const password = "123456!";
    const authError = {
      code: "auth/error",
      message: "Something went wrong",
    };

    mockSignInMethod.mockRejectedValueOnce(authError);

    render(<SignInForm />, { wrapper: MemoryRouter });

    expect(screen.queryByText(authError.message)).not.toBeInTheDocument();

    (screen.getByLabelText(/email/i) as HTMLInputElement).value = email;
    (screen.getByLabelText(/password/i) as HTMLInputElement).value = password;
    fireEvent.click(screen.getByRole("button"));

    expect(mockSignInMethod).toHaveBeenCalledTimes(1);
    expect(mockSignInMethod).toHaveBeenCalledWith(email, password);

    expect(
      await waitForElement(() => screen.getByText(authError.message))
    ).toBeInTheDocument();
  });
});

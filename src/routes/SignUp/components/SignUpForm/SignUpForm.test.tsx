import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitForElement,
} from "@testing-library/react";
import SignUpForm from "./SignUpForm";
import firebase from "firebase";
import { MemoryRouter } from "react-router-dom";

afterEach(() => {
  jest.clearAllMocks();
});

const mockCreateUserMethod = jest.spyOn(
  firebase.auth(),
  "createUserWithEmailAndPassword"
);

describe("Sign Up", () => {
  test("Test render", () => {
    render(<SignUpForm />, { wrapper: MemoryRouter });
  });

  test("Valid sign up", async () => {
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

    mockCreateUserMethod.mockResolvedValueOnce(mockUserCrendetial);

    render(<SignUpForm />, { wrapper: MemoryRouter });

    (screen.getByLabelText(/email/i) as HTMLInputElement).value = email;
    (screen.getByLabelText(/password/i) as HTMLInputElement).value = password;
    fireEvent.click(screen.getByRole("button"));

    expect(mockCreateUserMethod).toHaveBeenCalledTimes(1);
    expect(mockCreateUserMethod).toHaveBeenCalledWith(email, password);
  });

  test("Invalid Sign Up", async () => {
    const email = "test@test.test";
    const password = "123456!";
    const authError = {
      code: "auth/error",
      message: "Something went wrong",
    };

    mockCreateUserMethod.mockRejectedValueOnce(authError);

    render(<SignUpForm />, { wrapper: MemoryRouter });

    expect(screen.queryByText(authError.message)).not.toBeInTheDocument();

    (screen.getByLabelText(/email/i) as HTMLInputElement).value = email;
    (screen.getByLabelText(/password/i) as HTMLInputElement).value = password;
    fireEvent.click(screen.getByRole("button"));

    expect(mockCreateUserMethod).toHaveBeenCalledTimes(1);
    expect(mockCreateUserMethod).toHaveBeenCalledWith(email, password);

    expect(
      await waitForElement(() => screen.getByText(authError.message))
    ).toBeInTheDocument();
  });
});

import * as React from "react";
import {
  render,
  screen,
  cleanup,
  waitForElement,
} from "@testing-library/react";
import Register from "./Register";
import firebase from "firebaseConfig";

afterEach(() => {
  cleanup();
  jest.clearAllMocks();
});

const mockCreateUserMethod = jest.spyOn(
  firebase.auth(),
  "createUserWithEmailAndPassword"
);

describe("Register", () => {
  test("Test render", () => {
    render(<Register />);
  });

  test("Valid Registartion", async () => {
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

    mockCreateUserMethod.mockImplementationOnce(
      async (email, password): Promise<firebase.auth.UserCredential> => {
        return mockUserCrendetial;
      }
    );

    render(<Register />);

    (screen.getByLabelText(/email/i) as HTMLInputElement).value = email;
    (screen.getByLabelText(/password/i) as HTMLInputElement).value = password;
    (screen.getByText(/register/i) as HTMLButtonElement).click();

    expect(mockCreateUserMethod).toHaveBeenCalledTimes(1);
    expect(mockCreateUserMethod).toHaveBeenCalledWith(email, password);
  });

  test("Invalid Registration", async () => {
    const email = "test@test.test";
    const password = "123456!";
    const authError = {
      code: "auth/error",
      message: "Something went wrong",
    };

    mockCreateUserMethod.mockImplementationOnce(
      async (email, password): Promise<firebase.auth.UserCredential> => {
        return Promise.reject(authError);
      }
    );

    render(<Register />);

    expect(screen.queryByText(authError.message)).not.toBeInTheDocument();

    (screen.getByLabelText(/email/i) as HTMLInputElement).value = email;
    (screen.getByLabelText(/password/i) as HTMLInputElement).value = password;
    (screen.getByText(/register/i) as HTMLButtonElement).click();

    expect(mockCreateUserMethod).toHaveBeenCalledTimes(1);
    expect(mockCreateUserMethod).toHaveBeenCalledWith(email, password);

    expect(
      await waitForElement(() => screen.getByText(authError.message))
    ).toBeInTheDocument();
  });
});

import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitForElement,
} from "@testing-library/react";
import ResetPasswordForm from "./ResetPasswordForm";
import firebase from "firebase";
import { MemoryRouter } from "react-router-dom";

afterEach(() => {
  jest.clearAllMocks();
});

const mockResetMethod = jest.spyOn(firebase.auth(), "sendPasswordResetEmail");

describe("ResetPassword", () => {
  test("Render ResetPassword", () => {
    render(<ResetPasswordForm />, { wrapper: MemoryRouter });
  });

  test("Valid Reset Password", async () => {
    const email = "test@test.test";
    const alertMessage = "The email was sent.";

    mockResetMethod.mockResolvedValueOnce();

    render(<ResetPasswordForm />, { wrapper: MemoryRouter });

    (screen.getByLabelText(/email/i) as HTMLInputElement).value = email;
    fireEvent.click(screen.getByRole("button"));

    expect(mockResetMethod).toHaveBeenCalledTimes(1);
    expect(mockResetMethod).toHaveBeenCalledWith(email);

    expect(
      await waitForElement(() => screen.getByText(alertMessage))
    ).toBeInTheDocument();
  });

  test("Invalid Reset Password", async () => {
    const email = "test@test.test";
    const authError = {
      code: "auth/error",
      message: "Something went wrong",
    };

    mockResetMethod.mockRejectedValueOnce(authError);

    render(<ResetPasswordForm />, { wrapper: MemoryRouter });

    expect(screen.queryByText(authError.message)).not.toBeInTheDocument();

    (screen.getByLabelText(/email/i) as HTMLInputElement).value = email;
    fireEvent.click(screen.getByRole("button"));

    expect(mockResetMethod).toHaveBeenCalledTimes(1);
    expect(mockResetMethod).toHaveBeenCalledWith(email);

    expect(
      await waitForElement(() => screen.getByText(authError.message))
    ).toBeInTheDocument();
  });
});

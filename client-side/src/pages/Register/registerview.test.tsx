import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter as Router } from "react-router-dom";
import RegisterViewComponent from "./view"; // Adjust path as necessary

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(() => jest.fn()),
}));

describe("RegisterViewComponent", () => {
  const mockHandleSubmit = jest.fn();
  const mockHandleChange = jest.fn();
  const mockNavigate = jest.fn();

  const defaultFormData = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const defaultErrors = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const renderComponent = (props = {}) =>
    render(
      <Router>
        <RegisterViewComponent
          handleSubmit={mockHandleSubmit}
          formData={defaultFormData}
          handleChange={mockHandleChange}
          errors={defaultErrors}
          finalErrorMessage=""
          {...props}
        />
      </Router>
    );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders all form fields correctly", () => {
    renderComponent();

    expect(screen.getByTestId("first-name-input")).toBeInTheDocument();
    expect(screen.getByTestId("last-name-input")).toBeInTheDocument();
    expect(screen.getByTestId("email-input")).toBeInTheDocument();
    expect(screen.getByTestId("password-input")).toBeInTheDocument();
    expect(screen.getByTestId("confirm-password-input")).toBeInTheDocument();
  });

  it("calls handleChange for each input field when changed", () => {
    renderComponent();

    fireEvent.change(screen.getByTestId("first-name-input"), {
      target: { value: "John" },
    });
    expect(mockHandleChange).toHaveBeenCalledWith(
      expect.any(Object),
      "firstName"
    );

    fireEvent.change(screen.getByTestId("email-input"), {
      target: { value: "test@example.com" },
    });
    expect(mockHandleChange).toHaveBeenCalledWith(expect.any(Object), "email");
  });

  it("displays error messages when provided", () => {
    const errorMessages = {
      firstName: "First name is required",
      lastName: "Last name is required",
      email: "Invalid email",
      password: "Password too short",
      confirmPassword: "Passwords do not match",
    };

    renderComponent({ errors: errorMessages });

    expect(screen.getByText(errorMessages.firstName)).toBeInTheDocument();
    expect(screen.getByText(errorMessages.email)).toBeInTheDocument();
  });

  it("calls handleSubmit when form is submitted", () => {
    renderComponent();

    fireEvent.submit(screen.getByTestId("register-form"));
    expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
  });

  it("displays a success message and handles navigation on successful registration", () => {
    renderComponent({
      finalErrorMessage: "User Registered Successfully",
    });

    const successMessage = screen.getByText(
      "User Registered Successfully . Click here to login."
    );
    expect(successMessage).toBeInTheDocument();

    fireEvent.click(successMessage);
    expect(mockNavigate).toHaveBeenCalledTimes(1);
  });

  it("displays an error message when finalErrorMessage is provided", () => {
    renderComponent({ finalErrorMessage: "An error occurred" });

    expect(screen.getByText("An error occurred")).toBeInTheDocument();
  });
});

import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import RegisterComponent from "./index"; // Adjust the import path as necessary
import { registerRequest } from "../../redux/actions";
import { useNavigate } from "react-router-dom";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

jest.mock("../../redux/actions", () => ({
  registerRequest: jest.fn(),
}));

const initialState = {
  auth: {
    message: "",
  },
};

const mockStore = configureStore();
let store;

describe("RegisterComponent", () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    store = mockStore(initialState);
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    jest.clearAllMocks();
  });

  const renderComponent = (state = initialState) => {
    store = mockStore(state);
    render(
      <Provider store={store}>
        <RegisterComponent />
      </Provider>
    );
  };

  it("renders the form fields correctly", () => {
    renderComponent();

    const inputFields = [
      "email-input",
      "password-input",
      "confirm-password-input",
      "first-name-input",
      "last-name-input",
    ];

    inputFields.forEach((field) => {
      expect(screen.getByTestId(field)).toBeInTheDocument();
    });
  });

  it("validates inputs and displays error messages on invalid submission", () => {
    renderComponent();

    fireEvent.submit(screen.getByTestId("register-form"));

    expect(
      screen.getByText("Please fix the highlighted errors before submitting.")
    ).toBeInTheDocument();
  });

  it("updates formData and error state correctly on input change", () => {
    renderComponent();

    fireEvent.change(screen.getByTestId("email-input"), {
      target: { value: "invalid-email" },
    });
    expect(screen.getByText("Invalid email format.")).toBeInTheDocument();

    fireEvent.change(screen.getByTestId("password-input"), {
      target: { value: "short" },
    });
    expect(
      screen.getByText(
        "Password must contain at least 8 characters, including a letter, a number, and a special character."
      )
    ).toBeInTheDocument();
  });

  it("dispatches registerRequest action on valid form submission", () => {
    renderComponent();

    fireEvent.change(screen.getByTestId("email-input"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByTestId("password-input"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByTestId("confirm-password-input"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByTestId("first-name-input"), {
      target: { value: "John" },
    });
    fireEvent.change(screen.getByTestId("last-name-input"), {
      target: { value: "Doe" },
    });

    fireEvent.submit(screen.getByTestId("register-form"));

    expect(registerRequest).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "password123",
      confirmPassword: "password123",
      firstName: "John",
      lastName: "Doe",
    });
  });

  it("displays the auth state message when present", () => {
    const message = "User already exists";
    renderComponent({ auth: { message } });

    expect(screen.getByText(message)).toBeInTheDocument();
  });
});

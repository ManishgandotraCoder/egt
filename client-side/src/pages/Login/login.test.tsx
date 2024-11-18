import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import { BrowserRouter, useNavigate } from "react-router-dom";
import configureStore from "redux-mock-store";
import LoginComponent from ".";
import { authenticateRequest } from "../../redux/actions";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

jest.mock("../../redux/actions", () => ({
  authenticateRequest: jest.fn(),
}));

describe("LoginComponent", () => {
  const initialState = {
    auth: {
      isLoggedIn: false,
      user: null,
      token: null,
      message: null,
    },
  };
  const mockStore = configureStore();
  let store;

  beforeEach(() => {
    store = mockStore(initialState);
    jest.clearAllMocks();
  });

  const renderWithProvider = (ui, state = initialState) => {
    store = mockStore(state);
    render(
      <Provider store={store}>
        <BrowserRouter>{ui}</BrowserRouter>
      </Provider>
    );
  };

  it("displays error messages for invalid input", () => {
    renderWithProvider(<LoginComponent />);

    fireEvent.change(screen.getByTestId("email-input"), {
      target: { value: "invalid-email" },
    });
    fireEvent.change(screen.getByTestId("password-input"), {
      target: { value: "short" },
    });

    fireEvent.submit(screen.getByTestId("button"));

    // Add assertions for expected error messages
  });

  it("calls authenticateRequest on valid input", () => {
    renderWithProvider(<LoginComponent />);

    fireEvent.change(screen.getByTestId("email-input"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByTestId("password-input"), {
      target: { value: "password123" },
    });

    fireEvent.submit(screen.getByTestId("button"));

    expect(authenticateRequest).toHaveBeenCalledWith({
      email: "test@example.com",
      password: "password123",
    });
  });

  it("shows success toast on successful login", () => {
    const mockNavigate = jest.fn();
    jest.mocked(useNavigate).mockReturnValue(mockNavigate);

    renderWithProvider(<LoginComponent />, {
      auth: {
        isLoggedIn: true,
        user: { id: 1, name: "John Doe" },
        token: "fake-token",
        message: "Login successful",
      },
    });

    expect(screen.getByTestId("toast")).toHaveTextContent("Login successful");
  });
});

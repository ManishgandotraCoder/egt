import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Toast from "../../components/Notification";
import LoginViewComponent from "./view";
import { BrowserRouter as Router } from "react-router-dom";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("LoginViewComponent", () => {
  const mockNavigate = jest.fn();
  const mockHandleSubmit = jest.fn();
  const mockHandleChange = jest.fn();
  const mockHandleClose = jest.fn();

  const defaultProps = {
    toast: null,
    handleSubmit: mockHandleSubmit,
    handleClose: mockHandleClose,
    formData: { email: "", password: "" },
    handleChange: mockHandleChange,
    errors: { email: "", password: "" },
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = (props = defaultProps) =>
    render(
      <Router>
        <LoginViewComponent {...props} />
      </Router>
    );

  it("renders InputComponents for email and password", () => {
    renderComponent();

    expect(screen.getByTestId("email-input")).toBeInTheDocument();
    expect(screen.getByTestId("password-input")).toBeInTheDocument();
  });

  it("renders ButtonComponent with the correct label", () => {
    renderComponent();

    expect(screen.getByTestId("button")).toHaveTextContent("Login");
  });

  it("calls handleChange when input fields are changed", () => {
    renderComponent();

    fireEvent.change(screen.getByTestId("email-input"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByTestId("password-input"), {
      target: { value: "password123" },
    });

    expect(mockHandleChange).toHaveBeenCalledTimes(2);
    expect(mockHandleChange).toHaveBeenCalledWith("email", "test@example.com");
    expect(mockHandleChange).toHaveBeenCalledWith("password", "password123");
  });

  it("calls handleSubmit when the form is submitted", () => {
    renderComponent();

    fireEvent.submit(screen.getByTestId("login-form"));

    expect(mockHandleSubmit).toHaveBeenCalledTimes(1);
  });

  it("renders a link to the registration page", () => {
    renderComponent();

    const linkElement = screen.getByText(
      /Don't have an account\? Click here to register/i
    );
    expect(linkElement).toBeInTheDocument();
    expect(linkElement.closest("a")).toHaveAttribute("href", "/register");
  });
});

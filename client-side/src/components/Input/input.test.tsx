import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom"; // For extended matchers
import InputComponent from ".";

describe("InputComponent", () => {
  const defaultProps = {
    type: "text",
    id: "test-input",
    value: "",
    placeholder: "Enter text",
    onChange: jest.fn(),
    dataTestId: "email-input",
  };

  it("renders input with correct attributes", () => {
    render(<InputComponent {...defaultProps} />);

    const inputElement = screen.getByPlaceholderText("Enter text");
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute("type", "text");
    expect(inputElement).toHaveAttribute("id", "test-input");
  });

  it("displays error message when errorMessage prop is passed", () => {
    render(
      <InputComponent {...defaultProps} errorMessage="This field is required" />
    );

    const errorElement = screen.getByText("This field is required");
    expect(errorElement).toBeInTheDocument();
    expect(errorElement).toHaveAttribute("id", "test-input-error");
  });

  it("applies error styles when errorMessage is provided", () => {
    render(<InputComponent {...defaultProps} errorMessage="Invalid input" />);

    const inputElement = screen.getByPlaceholderText("Enter text");
    expect(inputElement).toHaveClass("errorField");
    expect(inputElement).toHaveAttribute("aria-invalid", "true");
  });

  it("does not apply error styles when errorMessage is not provided", () => {
    render(<InputComponent {...defaultProps} />);

    const inputElement = screen.getByPlaceholderText("Enter text");
    expect(inputElement).not.toHaveClass("errorField");
    expect(inputElement).toHaveAttribute("aria-invalid", "false");
  });

  it("calls onChange when input value changes", () => {
    const handleChange = jest.fn();
    render(<InputComponent {...defaultProps} onChange={handleChange} />);

    const inputElement = screen.getByPlaceholderText("Enter text");
    fireEvent.change(inputElement, { target: { value: "New value" } });
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});

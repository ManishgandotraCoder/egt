import React from "react";
import { render, screen, act } from "@testing-library/react";
import "@testing-library/jest-dom"; // For extended matchers
import Toast, { ToastProps } from ".";

describe("Toast Component", () => {
  const defaultProps: ToastProps = {
    message: "Test Message",
    type: "success",
    duration: 3000,
    onClose: jest.fn(),
  };

  beforeEach(() => {
    jest.useFakeTimers(); // Use fake timers globally for duration-based tests
  });

  afterEach(() => {
    jest.clearAllTimers(); // Clear timers to avoid state carryover
    jest.useRealTimers(); // Revert to real timers after each test
  });

  it("renders the Toast component with correct message and type", () => {
    render(<Toast {...defaultProps} />);
    const toastElement = screen.getByText("Test Message");

    expect(toastElement).toBeInTheDocument();
    expect(toastElement).toHaveClass("toast-message");
    expect(toastElement.closest(".toast")).toHaveClass("toast-success");
  });

  it("calls onClose after the specified duration", () => {
    const onCloseMock = jest.fn();
    render(<Toast {...defaultProps} onClose={onCloseMock} />);

    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(onCloseMock).toHaveBeenCalledTimes(1);
  });

  it("does not call onClose if unmounted before duration ends", () => {
    const onCloseMock = jest.fn();
    const { unmount } = render(
      <Toast {...defaultProps} onClose={onCloseMock} />
    );

    unmount(); // Unmount before timer completes
    act(() => {
      jest.advanceTimersByTime(3000);
    });

    expect(onCloseMock).not.toHaveBeenCalled();
  });

  it("applies the correct progress bar animation duration", () => {
    render(<Toast {...defaultProps} duration={5000} />);
    const progressBar = screen.getByRole("progressbar", { hidden: true });

    expect(progressBar).toHaveStyle({ animationDuration: "5s" });
  });
});

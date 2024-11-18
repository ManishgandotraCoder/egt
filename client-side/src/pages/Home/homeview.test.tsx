import React from "react";
import { render, screen, fireEvent, act } from "@testing-library/react";
import HomeViewComponent from "./view";

describe("HomeViewComponent", () => {
  const mockLogout = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderComponent = () =>
    render(<HomeViewComponent logout={mockLogout} />);

  it("renders the component with the correct structure", () => {
    renderComponent();

    // Verify main container
    expect(screen.getByTestId("home-view")).toBeInTheDocument();

    // Verify heading and welcome text
    expect(screen.getByText("Easy Generator Task")).toBeInTheDocument();
    expect(screen.getByText("Welcome to the Application")).toBeInTheDocument();
  });

  it("renders the logout button with the correct label", () => {
    renderComponent();

    const logoutButton = screen.getByTestId("logout-button");
    expect(logoutButton).toBeInTheDocument();
    expect(logoutButton).toHaveTextContent("Logout");
  });

  it("calls the logout function when the logout button is clicked", () => {
    renderComponent();

    const logoutButton = screen.getByTestId("logout-button");

    act(() => {
      fireEvent.click(logoutButton);
    });

    expect(mockLogout).toHaveBeenCalledTimes(1);
  });

  it("applies the correct classes for layout and design", () => {
    renderComponent();

    const homeContainer = screen
      .getByTestId("home-view")
      .querySelector(".home-container");
    expect(homeContainer).toHaveClass("home-container");

    const logoutButton = screen.getByTestId("logout-button");
    expect(logoutButton).toHaveClass("item-right");
  });

  it("renders the heading with correct structure and styles", () => {
    renderComponent();

    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent("Welcome to the Application");

    const homeSpan = screen
      .getByText("Welcome to the Application")
      .closest("span");
    expect(homeSpan).toHaveClass("home");
  });
});

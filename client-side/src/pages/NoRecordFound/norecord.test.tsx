import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import NoPageFound from "."; // Import NoPageFound component
import { useNavigate } from "react-router-dom";

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("NoPageFound Component", () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
    jest.clearAllMocks();
  });

  const renderComponent = () =>
    render(
      <BrowserRouter>
        <NoPageFound />
      </BrowserRouter>
    );

  it("renders the 404 error message and description", () => {
    renderComponent();

    expect(screen.getByText("404")).toBeInTheDocument();
    expect(screen.getByText("Page Not Found")).toBeInTheDocument();
    expect(
      screen.getByText("Sorry, the page you're looking for doesn't exist.")
    ).toBeInTheDocument();
  });

  it("renders the 'Go Back' button with correct label", () => {
    renderComponent();

    const goBackButton = screen.getByTestId("go-back-button");
    expect(goBackButton).toBeInTheDocument();
    expect(goBackButton).toHaveTextContent("Go Back");
  });

  it("navigates back when 'Go Back' button is clicked", () => {
    renderComponent();

    fireEvent.click(screen.getByTestId("go-back-button"));

    expect(mockNavigate).toHaveBeenCalledWith(-1);
    expect(mockNavigate).toHaveBeenCalledTimes(1);
  });

  it("applies correct styles to elements", () => {
    renderComponent();

    expect(screen.getByText("404")).toHaveClass("error-code");
    expect(screen.getByText("Page Not Found").closest("div")).toHaveClass(
      "no-page-found"
    );
  });
});

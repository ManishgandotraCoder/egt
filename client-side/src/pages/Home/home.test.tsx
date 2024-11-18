import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import HomeComponent from ".";
import HomeViewComponent from "./view";

jest.mock("./view", () => ({
  __esModule: true,
  default: jest.fn(({ logout }) => (
    <div data-testid="home-view">
      <div data-testid="logout-button" className="item-right" onClick={logout}>
        Logout
      </div>
    </div>
  )),
}));

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("HomeComponent", () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest
      .spyOn(require("react-router-dom"), "useNavigate")
      .mockReturnValue(mockNavigate);
  });

  const renderWithRouter = (component) =>
    render(<BrowserRouter>{component}</BrowserRouter>);

  it("redirects to '/' if no user is found in localStorage", () => {
    localStorage.removeItem("user");

    renderWithRouter(<HomeComponent />);

    expect(mockNavigate).toHaveBeenCalledWith("/");
  });

  it("does not redirect if user is found in localStorage", () => {
    localStorage.setItem("user", JSON.stringify({ name: "testUser" }));

    renderWithRouter(<HomeComponent />);

    expect(mockNavigate).not.toHaveBeenCalled();
  });

  it("renders HomeViewComponent", () => {
    localStorage.setItem("user", JSON.stringify({ name: "testUser" }));

    renderWithRouter(<HomeComponent />);

    expect(screen.getByTestId("home-view")).toBeInTheDocument();
  });

  it("calls logout and redirects when logout button is clicked", () => {
    localStorage.setItem("user", JSON.stringify({ name: "testUser" }));
    renderWithRouter(<HomeComponent />);

    fireEvent.click(screen.getByTestId("logout-button"));

    expect(mockNavigate).toHaveBeenCalledWith("/");
    expect(localStorage.getItem("user")).toBeNull();
  });
});

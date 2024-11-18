import React from "react";
import { render, screen } from "@testing-library/react";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store/store";
import { BrowserRouter, MemoryRouter } from "react-router-dom";

test("renders without crashing", () => {
  const { container } = render(<App />);
  expect(container).toBeDefined();
});

jest.mock("./AppRoutes", () => () => <div data-testid="app-routes"></div>);

test("renders AppRoutes component", () => {
  render(<App />);
  expect(screen.getByTestId("app-routes")).toBeInTheDocument();
});

test("checks App component does not crash due to missing CSS", () => {
  expect(() => render(<App />)).not.toThrow();
});

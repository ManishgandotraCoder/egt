import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom"; // For extended matchers
import ButtonComponent from ".";

describe("ButtonComponent", () => {
  const label = "Click Me";

  it("renders ButtonComponent with correct label", () => {
    render(
      <ButtonComponent
        label={label}
        handleClick={() => {}}
        classes="test-class"
      />
    );
    expect(
      screen.getByRole("button", { name: /click me/i })
    ).toBeInTheDocument();
  });

  it("calls handleClick when button is clicked", () => {
    const handleClick = jest.fn();
    render(
      <ButtonComponent label={label} handleClick={handleClick} classes="" />
    );

    fireEvent.click(screen.getByRole("button", { name: /click me/i }));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("applies the correct classes from props", () => {
    const testClass = "custom-class";
    render(
      <ButtonComponent
        label={label}
        handleClick={() => {}}
        classes={testClass}
      />
    );

    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toHaveClass("ButtonStyle", testClass);
  });

  it("matches snapshot", () => {
    const { asFragment } = render(
      <ButtonComponent
        label={label}
        handleClick={() => {}}
        classes="test-class"
      />
    );
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders with correct type attribute", () => {
    render(<ButtonComponent label={label} handleClick={() => {}} classes="" />);
    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toHaveAttribute("type", "submit");
  });
});

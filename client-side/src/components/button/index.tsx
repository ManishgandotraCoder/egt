import React from "react";
import { buttonInterface } from "./interface";
import "./styles.css";

const ButtonComponent = ({
  label,
  handleClick,
  classes,
  dataTestId,
}: buttonInterface) => {
  return (
    <button
      type="submit"
      data-testid={dataTestId} // Ensuring data-testid is applied here
      className={`ButtonStyle ` + classes}
      onClick={handleClick}
    >
      {label}
    </button>
  );
};

export default ButtonComponent;

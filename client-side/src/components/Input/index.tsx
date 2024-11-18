import React from "react";
import "./styles.css";
interface InputComponentProps {
  type: string;
  id: string;
  value: string;
  placeholder: string;
  errorMessage?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  dataTestId: string;
}

const InputComponent: React.FC<InputComponentProps> = ({
  type,
  id,
  value,
  placeholder,
  errorMessage,
  onChange,
  dataTestId,
}) => {
  return (
    <div className="inputWrapper">
      <input
        type={type}
        id={id}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className={`inputField ${errorMessage ? "errorField" : ""}`}
        aria-invalid={!!errorMessage}
        aria-describedby={`${id}-error`}
        data-testid={dataTestId}
      />
      {errorMessage && (
        <span id={`${id}-error`} className="errorText">
          {errorMessage}
        </span>
      )}
    </div>
  );
};

export default InputComponent;

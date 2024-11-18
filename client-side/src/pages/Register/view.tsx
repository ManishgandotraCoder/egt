import React from "react";
import { useEffect } from "react";
import InputComponent from "../../components/Input";
import { registerViewInterface } from "./interface";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import ButtonComponent from "../../components/button";
const RegisterViewComponent = ({
  handleSubmit,
  formData,
  handleChange,
  errors,
  finalErrorMessage,
}: registerViewInterface) => {
  const navigate = useNavigate();
  useEffect(() => {}, [finalErrorMessage]);
  return (
    <div className="container">
      <div className="boxStyle">
        <span className="egt">Easy Generator Task</span>
        <h2 className="headingStyle">Register</h2>
        <form
          onSubmit={handleSubmit}
          className="formStyle"
          data-testid="register-form"
        >
          <InputComponent
            type="text"
            value={formData.firstName}
            placeholder="Enter first name"
            id="First name"
            onChange={(e) => handleChange(e, "firstName")}
            errorMessage={errors.firstName}
            dataTestId="first-name-input"
          />
          <InputComponent
            type="text"
            value={formData.lastName}
            placeholder="Enter last name"
            id="Last name"
            onChange={(e) => handleChange(e, "lastName")}
            errorMessage={errors.lastName}
            dataTestId="last-name-input"
          />
          <InputComponent
            type="email"
            value={formData.email}
            placeholder="Enter email"
            id="Email"
            onChange={(e) => handleChange(e, "email")}
            errorMessage={errors.email}
            dataTestId="email-input"
          />
          <InputComponent
            type="password"
            value={formData.password}
            placeholder="Enter password"
            id="Password"
            onChange={(e) => handleChange(e, "password")}
            errorMessage={errors.password}
            dataTestId="password-input"
          />
          <InputComponent
            type="password"
            value={formData.confirmPassword}
            placeholder="Enter confirm password"
            id="Confirm Password"
            onChange={(e) => handleChange(e, "confirmPassword")}
            errorMessage={errors.confirmPassword}
            dataTestId="confirm-password-input"
          />

          <ButtonComponent label="Register" />
        </form>
        <a href="/" className="forgotPasswordStyle">
          Already have an account? Click here to login
        </a>

        {finalErrorMessage === "User Registered Successfully" ? (
          <span className="success" onClick={() => navigate("/")}>
            User Registered Successfully . Click here to login.
          </span>
        ) : (
          <span className="error">{finalErrorMessage}</span>
        )}
      </div>
    </div>
  );
};
export default RegisterViewComponent;

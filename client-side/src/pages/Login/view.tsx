import React from "react";
import ButtonComponent from "../../components/button";
import InputComponent from "../../components/Input";
import Toast from "../../components/Notification";
import { LoginViewInterface } from "./interface";

const LoginViewComponent = ({
  toast,
  handleSubmit,
  handleClose,
  formData,
  handleChange,
  errors,
}: LoginViewInterface) => {
  return (
    <div className="container">
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          duration={toast.duration}
          onClose={handleClose}
        />
      )}
      <div className="boxStyle">
        <span className="egt">Easy Generator Task</span>

        <h2 className="headingStyle">Login</h2>
        <form
          onSubmit={handleSubmit}
          className="formStyle"
          data-testid="login-form"
        >
          <InputComponent
            type="email"
            value={formData.email}
            dataTestId="email-input"
            placeholder="Enter email"
            id="Email"
            onChange={(e) => handleChange(e, "email")}
            errorMessage={errors.email}
          />
          <InputComponent
            type="password"
            value={formData.password}
            placeholder="Enter password"
            dataTestId="password-input"
            id="Password"
            onChange={(e) => handleChange(e, "password")}
            errorMessage={errors.password}
          />

          <ButtonComponent label="Login" dataTestId="button" />
        </form>
        <a href="/register" className="forgotPasswordStyle">
          Don't have an account? Click here to register
        </a>
      </div>
    </div>
  );
};
export default LoginViewComponent;

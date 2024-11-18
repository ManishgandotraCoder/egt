import React, { useEffect, useState, useCallback, useMemo } from "react";
import "../../styles/authStyles.css";
import { validateEmail, validatePassword } from "../../helper/utils";
import { registerInterface } from "./interface";
import { useDispatch, useSelector } from "react-redux";
import { registerRequest } from "../../redux/actions";
import RegisterViewComponent from "./view";
import { messages } from "../../helper/messages";

const initialValues: registerInterface = {
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  confirmPassword: "",
};

const RegisterComponent: React.FC = () => {
  const [formData, setFormData] = useState<registerInterface>(initialValues);
  const [errors, setErrors] = useState<registerInterface>(initialValues);
  const [finalErrorMessage, setFinalErrorMessage] = useState<string>("");

  const authState = useSelector((state: any) => state.auth);
  const dispatch = useDispatch();

  const validateField = (
    field: keyof registerInterface,
    value: string
  ): string => {
    if (field === "email") {
      return validateEmail(value) ? "" : messages.INVALID_EMAIL;
    }
    if (field === "password") {
      return validatePassword(value) ? "" : messages.PASSWORD_AUTH_MESSAGE;
    }
    if (field === "firstName" || field === "lastName") {
      return value.length >= 3 ? "" : messages.ENTER_THREE_CHARACTERS;
    }
    if (field === "confirmPassword" && formData.password) {
      return value === formData.password ? "" : messages.PASSWORD_MISMATCH;
    }
    return "";
  };

  const handleChange = useCallback(
    (
      e: React.ChangeEvent<HTMLInputElement>,
      field: keyof registerInterface
    ) => {
      const value = e.target.value;
      setFormData((prev) => ({ ...prev, [field]: value }));
      setErrors((prev) => ({
        ...prev,
        [field]: validateField(field, value),
      }));
    },
    [formData]
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();

      const formValidationErrors = {
        email: validateEmail(formData.email) ? "" : messages.INVALID_EMAIL,
        password: validatePassword(formData.password)
          ? ""
          : messages.PASSWORD_AUTH_MESSAGE,
        firstName: validateField("firstName", formData.firstName),
        lastName: validateField("lastName", formData.lastName),
        confirmPassword:
          formData.confirmPassword === formData.password
            ? ""
            : messages.PASSWORD_MISMATCH,
      };

      setErrors(formValidationErrors);

      if (Object.values(formValidationErrors).every((error) => !error)) {
        dispatch(registerRequest(formData));
      } else {
        setFinalErrorMessage(
          "Please fix the highlighted errors before submitting."
        );
      }
    },
    [dispatch, formData]
  );

  useEffect(() => {
    if (authState.message) {
      setFinalErrorMessage(authState.message);
    }
  }, [authState.message]);

  return (
    <RegisterViewComponent
      handleSubmit={handleSubmit}
      formData={formData}
      handleChange={handleChange}
      errors={errors}
      finalErrorMessage={finalErrorMessage}
    />
  );
};

export default RegisterComponent;

import React, { useEffect, useState, useCallback, useMemo } from "react";
import "../../styles/authStyles.css";
import { validateEmail, validatePassword } from "../../helper/utils";
import { loginInterface } from "./interface";
import { useDispatch, useSelector } from "react-redux";
import { authenticateRequest } from "../../redux/actions";
import { useNavigate } from "react-router-dom";
import { ToastProps } from "../../components/Notification";
import LoginViewComponent from "./view";
import { messages } from "../../helper/messages";

const initialValues: loginInterface = { email: "", password: "" };
export const validateField = (
  field: keyof loginInterface,
  value: string
): string => {
  if (field === "email") {
    return validateEmail(value) ? "" : messages.INVALID_EMAIL;
  }
  if (field === "password") {
    return validatePassword(value) ? "" : messages.PASSWORD_AUTH_MESSAGE;
  }
  return "";
};

const LoginComponent: React.FC = () => {
  const [formData, setFormData] = useState<loginInterface>(initialValues);
  const [errors, setErrors] = useState<loginInterface>(initialValues);
  const [toast, setToast] = useState<ToastProps | null>(null);

  const authState = useSelector((state: any) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleClose = useCallback(() => setToast(null), []);

  const showToast = useCallback(
    (message: string, type: ToastProps["type"], duration = 5000) => {
      setToast({ message, type, duration, onClose: handleClose });
    },
    [handleClose]
  );

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>, field: keyof loginInterface) => {
      const value = e.target.value;
      setFormData((prev) => ({ ...prev, [field]: value }));
      setErrors((prev) => ({
        ...prev,
        [field]: validateField(field, value),
      }));
    },
    []
  );

  const newErrors = useMemo(
    () => ({
      email: validateEmail(formData.email) ? "" : messages.INVALID_EMAIL,
      password: validatePassword(formData.password)
        ? ""
        : messages.PASSWORD_AUTH_MESSAGE,
    }),
    [formData]
  );

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setErrors(newErrors);

      if (Object.values(newErrors).every((error) => !error)) {
        dispatch(authenticateRequest(formData));
      } else {
        const errorMessages = Object.values(newErrors).filter(Boolean);
        showToast(errorMessages.join(", "), "danger");
      }
    },
    [dispatch, formData, newErrors, showToast]
  );

  useEffect(() => {
    if (authState.message) {
      const toastType = authState.isLoggedIn ? "success" : "danger";
      showToast(authState.message, toastType);
    }
  }, [authState.message, authState.isLoggedIn, showToast]);

  useEffect(() => {
    if (authState.isLoggedIn) {
      localStorage.setItem("user", JSON.stringify(authState.user));
      localStorage.setItem("token", authState.token);
      navigate("/home");
    }
  }, [authState.isLoggedIn, authState.user, authState.token, navigate]);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken) {
      navigate("/home");
    }
  }, [navigate]);

  return (
    <LoginViewComponent
      toast={toast}
      handleSubmit={handleSubmit}
      handleClose={handleClose}
      formData={formData}
      handleChange={handleChange}
      errors={errors}
    />
  );
};

export default LoginComponent;

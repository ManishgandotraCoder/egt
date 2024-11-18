import { ToastProps } from "../../components/Notification";

export interface registerInterface {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  confirmPassword: string;
}
export interface registerViewInterface {
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof registerInterface
  ) => void;
  handleSubmit: (e: React.FormEvent) => void;
  errors: registerInterface;
  formData: registerInterface;
  finalErrorMessage: string;
}

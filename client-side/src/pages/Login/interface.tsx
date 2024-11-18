import { ToastProps } from "../../components/Notification";

export interface loginInterface {
  email: string;
  password: string;
}
export interface LoginViewInterface {
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement>,
    field: keyof loginInterface
  ) => void;
  handleClose: () => void;
  handleSubmit: (e: React.FormEvent) => void;
  errors: { email: string; password: string };
  formData: { email: string; password: string };
  toast: {
    message: string;
    type: ToastProps["type"];
    duration: number;
  } | null;
}

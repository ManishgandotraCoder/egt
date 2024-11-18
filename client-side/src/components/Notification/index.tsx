import React, { useEffect } from "react";
import "./styles.css";

export interface ToastProps {
  message: string;
  type: "success" | "danger" | "warning" | "info";
  duration: number;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, type, duration, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  return (
    <div className={`toast toast-${type}`} data-testid="toast">
      <div className="toast-content-wrapper">
        <div className="toast-message">{message}</div>
        <div
          className="toast-progress"
          role="progressbar"
          style={{ animationDuration: `${duration / 1000}s` }}
        ></div>
      </div>
    </div>
  );
};

export default Toast;

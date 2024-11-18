import React, { ReactNode, useEffect } from "react";
import { Navigate } from "react-router-dom";

interface AuthGuardProps {
  children: ReactNode;
}

const AuthGuard: React.FC<AuthGuardProps> = ({ children }) => {
  const isLoggedIn = !!localStorage.getItem("token");

  useEffect(() => {}, [isLoggedIn]);
  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

export default AuthGuard;

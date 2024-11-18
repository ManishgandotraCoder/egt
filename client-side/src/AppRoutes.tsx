import React from "react";
import { useRoutes } from "react-router-dom";
import LoginComponent from "./pages/Login";
import RegisterComponent from "./pages/Register";
import HomeComponent from "./pages/Home";
import AuthGuard from "./guards/authGuard";
import NoRecordForm from "./pages/NoRecordFound";

const AppRoutes = () => {
  const routes = [
    {
      path: "/",
      element: <LoginComponent />,
    },
    {
      path: "/register",
      element: <RegisterComponent />,
    },
    {
      path: "/home",
      element: (
        <AuthGuard>
          <HomeComponent />
        </AuthGuard>
      ),
    },
    {
      path: "*",
      element: <NoRecordForm />,
    },
  ];

  return useRoutes(routes);
};

export default AppRoutes;

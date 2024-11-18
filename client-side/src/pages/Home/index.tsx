import React, { useEffect } from "react";
import "./styles.css";
import HomeViewComponent from "./view";
import { useNavigate } from "react-router-dom";

const HomeComponent = () => {
  const navigate = useNavigate();

  const logout = async () => {
    await localStorage.clear();
    window.location.reload();
    navigate("/");
  };

  useEffect(() => {
    const user = localStorage.getItem("user"); // Avoid re-triggering useEffect unnecessarily
    if (!user) {
      navigate("/");
    }
  }, [navigate]); // `navigate` dependency is stable

  return <HomeViewComponent logout={logout} />;
};

export default HomeComponent;

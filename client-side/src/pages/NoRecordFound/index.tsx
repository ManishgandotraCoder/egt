import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css"; // Import the CSS file
import ButtonComponent from "../../components/button";

const NoPageFound: React.FC = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1); // Navigate to the previous page
  };

  return (
    <div className="no-page-found">
      <h1 className="error-code">404</h1>
      <h2>Page Not Found</h2>
      <p>Sorry, the page you're looking for doesn't exist.</p>

      <ButtonComponent
        label="Go Back"
        dataTestId="go-back-button" // Correctly passing dataTestId
        handleClick={handleGoBack}
        classes="btnAuthWidth"
      />
    </div>
  );
};
export default NoPageFound;

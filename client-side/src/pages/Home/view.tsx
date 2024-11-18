import React from "react";
import { homeViewInterface } from "./interface";

const HomeViewComponent: React.FC<homeViewInterface> = ({ logout }) => {
  return (
    <div data-testid="home-view">
      <div className="home-container">
        <div className="item-left">
          <span className="egt">Easy Generator Task</span>
        </div>
        <div
          data-testid="logout-button"
          className="item-right"
          onClick={logout}
        >
          Logout
        </div>
      </div>
      <span className="home">
        <h1>Welcome to the Application</h1>
      </span>
    </div>
  );
};

export default HomeViewComponent;

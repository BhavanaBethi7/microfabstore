import React from "react";
import { Link } from "react-router-dom";
import "./AuthNavBar.css";

const AuthNavbar = () => {
  return (
    <nav className="auth-navbar">
      <div className="auth-navbar-left">
        <Link to="/" className="auth-navbar-logo">
          <img 
            src="./assets/logo.jpg" 
            alt="MicroFabStore Logo" 
            className="auth-logo-img"
          />
          <span>MicroFabStore</span>
        </Link>
      </div>
    </nav>
  );
};

export default AuthNavbar;

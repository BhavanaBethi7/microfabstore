import React from "react";
import { Link, NavLink } from "react-router-dom";
import "./NavBar.css";
import logo from "../assets/logo.jpg"; // ✅ update path if needed

const Navbar = () => {
  return (
    <nav className="navbar">
      {/* 🌿 Left: Logo */}
      <div className="navbar-left">
        <Link to="/" className="navbar-logo">
          <img src={logo} alt="MicroFabStore Logo" className="logo-img" />
        </Link>
      </div>

      {/* 🧭 Center: Category Links */}
      <div className="navbar-center">
        <ul className="nav-links">
          <li>
            <NavLink
              to="/category/substrates-wafers"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Substrates & Wafers
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/category/metals-components"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Metals & Components
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/category/chemicals-process-materials"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Chemicals & Process Materials
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/category/cleanroom-safety-gear"
              className={({ isActive }) => (isActive ? "active" : "")}
            >
              Cleanroom & Safety Gear
            </NavLink>
          </li>
        </ul>
      </div>

      {/* 👤 Right: Auth buttons */}
      <div className="navbar-right">
        <Link to="/login" className="auth-btn">
          Sign In
        </Link>
        <Link to="/register" className="auth-btn filled">
          Sign Up
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;
